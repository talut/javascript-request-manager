"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("axios/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestManager = function () {
  function RequestManager(requestErrors, requestErrorMessages) {
    var _this = this;

    _classCallCheck(this, RequestManager);

    this.requestErrors = requestErrors;
    this.requestErrorMessages = requestErrorMessages;
    this.baseURL = function (baseURL) {
      _this.BASE_URL = baseURL;
      return _this;
    };
    this.body = function (body) {
      _this.params = body;
      return _this;
    };
    this.setToken = function (token) {
      _this.token = token;
      return _this;
    };
    this.builder = function (req) {
      _this.request = req;
      return _this;
    };
    this.onSuccess = function (onSuccesCallback) {
      _this.onSuccessCallback = onSuccesCallback;
      return _this;
    };
    this.onFail = function (onFailCallback) {
      _this.onFailCallback = onFailCallback;
      return _this;
    };
    this.makeRequest = function () {
      _this.makeARequest();
    };
  }

  _createClass(RequestManager, [{
    key: "makeARequest",
    value: function makeARequest() {
      var _this2 = this;

      var url = this.BASE_URL + this.request.serviceURL;
      var header = Object.assign(this.request.headers !== undefined ? this.request.headers : {}, { token: this.request.isTokenRequired ? this.token : null });
      switch (this.request.method) {
        case "POST":
          {
            return _index2.default.post(url, this.params, {
              headers: header
            }).then(function (res) {
              _this2.onSuccessCallback(res);
            }).catch(function (err) {
              _this2.failHandler(err);
            });
          }
        case "GET":
          {
            return _index2.default.post(url, {
              params: this.params,
              headers: header
            }).then(function (res) {
              _this2.onSuccessCallback(res);
            }).catch(function (err) {
              _this2.failHandler(err);
            });
          }
      }
    }
  }, {
    key: "failHandler",
    value: function failHandler(err) {
      if (err.response !== undefined) {
        switch (err.response.status) {
          case this.requestErrors.INTERNAL_SERVER_ERROR.statusCode:
            {
              return this.onFailCallback({
                description: this.requestErrors.INTERNAL_SERVER_ERROR.statusDescription,
                message: this.requestErrors.INTERNAL_SERVER_ERROR.message,
                showRefreshComponent: this.requestErrors.INTERNAL_SERVER_ERROR.showRefreshComponent
              });
            }
          case this.requestErrors.BAD_GATEWAY.statusCode:
            {
              return this.onFailCallback({
                description: this.requestErrors.BAD_GATEWAY.statusDescription,
                message: this.requestErrors.BAD_GATEWAY.message,
                showRefreshComponent: this.requestErrors.BAD_GATEWAY.showRefreshComponent
              });
            }
          case this.requestErrors.NOT_FOUND.statusCode:
            {
              return this.onFailCallback({
                description: this.requestErrors.NOT_FOUND.statusDescription,
                message: this.requestErrors.NOT_FOUND.message,
                showRefreshComponent: this.requestErrors.NOT_FOUND.showRefreshComponent
              });
            }
          case this.requestErrors.GATEWAY_TIMEOUT:
            {
              return this.onFailCallback({
                description: this.requestErrors.GATEWAY_TIMEOUT.statusDescription,
                message: this.requestErrors.GATEWAY_TIMEOUT.message,
                showRefreshComponent: this.requestErrors.GATEWAY_TIMEOUT.showRefreshComponent
              });
            }
          case this.requestErrors.SERVICE_UNAVAILABLE:
            {
              return {
                description: this.requestErrors.SERVICE_UNAVAILABLE.statusDescription,
                message: this.requestErrors.SERVICE_UNAVAILABLE.message,
                showRefreshComponent: this.requestErrors.SERVICE_UNAVAILABLE.showRefreshComponent
              };
            }

          case this.requestErrors.FORBIDDEN.statusCode:
            {
              this.refreshToken();
              // TODO: Token için tekrar istek gönderilecek.  Bu işlem refresh token olmaz ise değişecek.
              break;
            }
          default:
            return {
              description: this.requestErrorMessages.UNHANDLED_ERROR.statusDescription,
              message: this.requestErrorMessages.UNHANDLED_ERROR.message,
              showRefreshComponent: this.requestErrorMessages.UNHANDLED_ERROR.showRefreshComponent
            };
        }
      } else {
        return {
          description: this.requestErrorMessages.UNHANDLED_ERROR.statusDescription,
          message: this.requestErrorMessages.UNHANDLED_ERROR.message,
          showRefreshComponent: this.requestErrorMessages.UNHANDLED_ERROR.showRefreshComponent
        };
      }
    }
  }, {
    key: "refreshToken",
    value: function refreshToken() {
      // TODO: Cooming soon
    }
  }]);

  return RequestManager;
}();

exports.default = RequestManager;