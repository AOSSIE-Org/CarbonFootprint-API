# Setting Auth0 and getting credentials

Find .env.example [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/.env.example) and auth0-config.js.example [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth/auth0-config.js.example) , fill these with your credentials.
To get these credentials you need to have your own Auth0 Application with your account and use the Application credentials in the above files. To make an Auth0 Application follow the steps below:

- Signup/Login at [Auth0.com](https://auth0.com).
- In the dashboard click on CREATE APPLICATION.
- Give name to the app **CarbonFootprint-API** (any app name will do).
- Choose application type as _Regular Web Application_ and click on `Create` button.
- Now you have your Application Domain i.e. `<username>.auth0.com`, Client ID. Please don't share your Client Secret key, it is used to check the application working inside [Auth0 console](https://auth0.com/docs/clients) for testing Auth0 APIs.( Just play with APIs to get best from Auth0 :) )
- Set `Token Endpoint Authentication Method` to `POST`.
- Set `Allowed Callback` URLs to 'http://localhost:3080/callback, http://localhost:3000/callback', `Allowed Web Origins` and `Allowed Origins (CORS)` to 'http://localhost:3080' and http://localhost:3000.
  ```
  Notice we have given two URLs, in callback as well as allowed origins, that is done because on local development machine we run two servers, one is the react development server and the other is express API server which run on different ports.
  ```
- In the Advanced settings > Grant Types, check the `Client Credentials` and save the changes.

Done! now you are all set to use Auth0 credentials for your Application, BINGO.
