# Javascript Request Manager (with Axios)

### Cooming Soon

**ES6 Usage Example (it will be updated as soon as possible.)**
```javascript

// Requests file : Create it once for always use :)
// **Requests.js**
const BASE_URL = "https://taluttasgiran.com.tr/api/v2/"
const Methods = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE"
}
const RequestRoutes = {
    MOBILE_LOGIN: "Mobile/Auth",
    MOBILE_POSTS: "Mobile/Posts",
}
const Requests = {
    MOBILE_LOGIN: {
       route: RequestRoutes.MOBILE_LOGIN,
       method: Methods.POST,
       showRefreshComponent: true, // not required // this for ReactJS component :)
       isTokenRequired: true, // not required
       headers: { "Content-Type": "application/json" } // not required
    }
}
```
```javascript
// USAGE
import RequestManager from 'javascript-request-manager'
import {RequestRoutes,BASE_URL, Requests, Methods} from './Requests'

const RManager = new RequestManager(RequestErrors, RequestErrorMessages);
const token = "abcdefghi14334dfsdfsdf3243esd"
RManager
    .baseURL(BASE_URL)
    .setToken(token)
    .body({email:"info@taluttasgiran.com.tr",password:"123456"}) // post body or get params
    .builder(Requests.MOBILE_LOGIN)
    .onSuccess((res)=>{
        console.log(res)
    })
    .onFail((err)=>{
        console.log(err.message)
    })
    .makeRequest();
```


```javascript
// RequestErrors and RequestErrorMessages
export const RequestErrorMessages = {
  SYSTEM_ERROR: "Sistemlerde bir sorun oluştu daha sonra tekrar deneyiniz.",
  UNAUTHORIZED: "Yetkisiz giriş",
  SERVER_ERROR: "Sunucularda bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz"
};
export const RequestErrors = {
  UNHANDLED_ERROR: {
    statusDescription: "Unhandled Error",
    message: RequestErrorMessages.SYSTEM_ERROR,
    showRefreshComponent: false,
  },
  UNAUTHORIZED: {
    statusCode: 401,
    statusDescription: "Unauthorized",
    message: RequestErrorMessages.UNAUTHORIZED,
    showRefreshComponent: false,
  },
  FORBIDDEN: {
    statusCode: 403,
    statusDescription: "Forbidden",
    message: RequestErrorMessages.UNAUTHORIZED,
    showRefreshComponent: false,
  },
  NOT_FOUND: {
    statusCode: 404,
    statusDescription: "Not Found",
    message: RequestErrorMessages.SYSTEM_ERROR,
    showRefreshComponent: true,
  },
  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    statusDescription: "Method Not Allowed",
    message: RequestErrorMessages.SYSTEM_ERROR,
    showRefreshComponent: true,
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    statusDescription: "Internal Server Error",
    message: RequestErrorMessages.SERVER_ERROR,
    showRefreshComponent: true,
  },
  BAD_GATEWAY: {
    statusCode: 502,
    statusDescription: "Bad Gateway",
    message: RequestErrorMessages.SERVER_ERROR,
    showRefreshComponent: true,
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    statusDescription: "Service Unavailable",
    message: RequestErrorMessages.SERVER_ERROR,
    showRefreshComponent: true,
  },
  GATEWAY_TIMEOUT: {
    statusCode: 504,
    statusDescription: "Gateway Timeout",
    message: RequestErrorMessages.SERVER_ERROR,
    showRefreshComponent: true,
  },
};
```