import axios from "axios/index";

export default class RequestManager {
  constructor(requestErrors, requestErrorMessages) {
    this.requestErrors = requestErrors;
    this.requestErrorMessages = requestErrorMessages;
    this.baseURL = (baseURL) => {
      this.BASE_URL = baseURL;
      return this;
    };
    this.body = (body) => {
      this.params = body;
      return this;
    };
    this.setToken = (token) => {
      this.token = token;
      return this;
    };
    this.builder = (req) => {
      this.request = req;
      return this;
    };
    this.onSuccess = (onSuccesCallback) => {
      this.onSuccessCallback = onSuccesCallback;
      return this;
    };
    this.onFail = (onFailCallback) => {
      this.onFailCallback = onFailCallback;
      return this;
    };
    this.makeRequest = () => {
      this.makeARequest();
    }
  }

  makeARequest() {
    const url = this.BASE_URL + this.request.route;
    let header = Object.assign(this.request.headers !== undefined ? this.request.headers : {}, { token: this.request.isTokenRequired ? this.token : undefined });
    switch (this.request.method) {
      case "POST": {
        return axios.post(url, this.params, {
          headers: header
        }).then((res) => {
          this.onSuccessCallback(res);
        }).catch((err) => {
          this.failHandler(err)
        });
      }
      case "GET": {
        return axios.post(url, {
          params: this.params,
          headers: header
        }).then((res) => {
          this.onSuccessCallback(res);
        }).catch((err) => {
          this.failHandler(err)
        });
      }
    }
  }

  failHandler(err) {
    if (err.response !== undefined) {
      switch (err.response.status) {
        case this.requestErrors.INTERNAL_SERVER_ERROR.statusCode: {
          return this.onFailCallback({
            description: this.requestErrors.INTERNAL_SERVER_ERROR.statusDescription,
            message: this.requestErrors.INTERNAL_SERVER_ERROR.message,
            showRefreshComponent: this.requestErrors.INTERNAL_SERVER_ERROR.showRefreshComponent
          })
        }
        case this.requestErrors.BAD_GATEWAY.statusCode: {
          return this.onFailCallback({
            description: this.requestErrors.BAD_GATEWAY.statusDescription,
            message: this.requestErrors.BAD_GATEWAY.message,
            showRefreshComponent: this.requestErrors.BAD_GATEWAY.showRefreshComponent
          })
        }
        case this.requestErrors.NOT_FOUND.statusCode: {
          return this.onFailCallback({
            description: this.requestErrors.NOT_FOUND.statusDescription,
            message: this.requestErrors.NOT_FOUND.message,
            showRefreshComponent: this.requestErrors.NOT_FOUND.showRefreshComponent
          })
        }
        case this.requestErrors.GATEWAY_TIMEOUT: {
          return this.onFailCallback({
            description: this.requestErrors.GATEWAY_TIMEOUT.statusDescription,
            message: this.requestErrors.GATEWAY_TIMEOUT.message,
            showRefreshComponent: this.requestErrors.GATEWAY_TIMEOUT.showRefreshComponent
          })
        }
        case this.requestErrors.SERVICE_UNAVAILABLE: {
          return {
            description: this.requestErrors.SERVICE_UNAVAILABLE.statusDescription,
            message: this.requestErrors.SERVICE_UNAVAILABLE.message,
            showRefreshComponent: this.requestErrors.SERVICE_UNAVAILABLE.showRefreshComponent
          }
        }

        case this.requestErrors.FORBIDDEN.statusCode : {
          this.refreshToken();
          // TODO: Token için tekrar istek gönderilecek.  Bu işlem refresh token olmaz ise değişecek.
          break;
        }
        default:
          return {
            description: this.requestErrorMessages.UNHANDLED_ERROR.statusDescription,
            message: this.requestErrorMessages.UNHANDLED_ERROR.message,
            showRefreshComponent: this.requestErrorMessages.UNHANDLED_ERROR.showRefreshComponent,
          }
      }
    } else {
      return {
        description: this.requestErrorMessages.UNHANDLED_ERROR.statusDescription,
        message: this.requestErrorMessages.UNHANDLED_ERROR.message,
        showRefreshComponent: this.requestErrorMessages.UNHANDLED_ERROR.showRefreshComponent,
      }
    }
  }

  refreshToken() {
    // TODO: Cooming soon
  }
}
