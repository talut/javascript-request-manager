# Javascript Request Manager

### Cooming Soon



**ES6 Usage Example (it will be updated as soon as possible.)**
```ecmascript 6
RManager
    .baseURL('https://taluttasgiran.com.tr/')
    .Body({email:"info@taluttasgiran.com.tr",password:"123456"})
    .Builder({
       route: "Mobile/Auth",
       method: "POST",
       showRefreshComponent: true, // not required // this for ReactJS component :)
       isTokenRequired: true, // not required
       headers: { "Content-Type": "application/json" } // not required
    })
    .onSuccess((res)=>{
        console.log(res)
    })
    .onFail((err)=>{
        console.log(err.message)
    })
    .makeRequest();
```