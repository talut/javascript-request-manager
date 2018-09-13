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
// RequestErrors and RequestErrorMessages will coming soon
// USAGE
import RequestManager from 'javascript-request-manager'
import {RequestRoutes,BASE_URL, Requests, Methods} from './Requests'

const RManager = new RequestManager(RequestErrors, RequestErrorMessages);

RManager
    .baseURL(BASE_URL)
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