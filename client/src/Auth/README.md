# Setting Auth0 and getting credentials 

Find .env.example [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/.env.example) and auth0-config.js.example [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth/auth0-config.js.example) , fill these with your credentials. 
To get these credentials you need to have your own Auth0 Application with your account and use the Application credentials in the above files. To make an Auth0 Application follow the steps below:
 * Signup/Login at [Auth0.com](https://auth0.com).
 * In the left menu click on [clients](https://manage.auth0.com/#/clients).
 * Choose the only application available with name **Default App**.
 *Note : You can make your own client application other than* **Default App** *if you already have another client. For more details please read about [Auth0 clients](https://auth0.com/docs/clients).*
 * Now you have your Application Domain i.e. `<username>.auth0.com`, Client ID. Please don't share your Client Secret key, it is  used to check the application working inside [Auth0 console](https://auth0.com/docs/clients) for testing Auth0 APIs.( Just play with APIs to get best from Auth0 :) )
 * Set `Client type` to `Non Interactive Client`.
 * Set `Token Endpoint Authentication Method` to `POST`.
 * Set `Allowed Callback` URLs to 'http://localhost:3080/callback', `Allowed Web Origins` to http://localhost:3080' and `Allowed Origins (CORS)` to 'http://localhost:3080'.
 * In the Advanced settings > Grant Types, check the `Client Credentials` and save the changes.
 
 Done! now you are all set to use Auth0 credentials for your Application, BINGO.
