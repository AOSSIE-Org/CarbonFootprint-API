# Carbon Footprint API

This project aims to have a universal API to find carbon footprint of almost anything.

# Prerequisites

At the time of development we were using :  
  - `npm : v6.9.0` or higher
  - `node : v10.15.3 (LTS)` or higher
  - `redis`
  - `mongo`

To check your current versions :

```
  npm --version
  node --version
```

# Building and Development Versions (v1)

Find .env.example [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/.env.example) and auth0-config.js.example [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth/auth0-config.js.example) , fill these with your credentials.

* Add ___.env___ [here](https://gitlab.com/aossie/CarbonFootprint-API) with the same format as [.env.example](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/.env.example). In `database` fill the database configuration. If you don't have one signup [here](https://mlab.com/signup/).
     * Add Microsoft Bing distance matrix API key. Find one [here](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key).
     * Add the `jwksUri` with `https://<userName>.auth0.com/.well-known/jwks.json` for example `https://footprintcarbon.auth0.com/.well-known/jwks.json`.
     * Add the `issuer` with `https://<userName>.auth0.com/`
     * Add the `redis host`, default being `127.0.0.1`
     * Add the `redis port`, default being `6379`
* Add [auth0-config.js]() [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth) with the same format as [auth0-config.js.example](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth/auth0-config.js.example)
     * Add `clientId` from the client you created above.
     * `domain` is `<userName>.auth0.com`.
     * Add `callbackUrl` with the one you added while making a client.
     * `tokenEndpoint` is `https://<userName>.auth0.com/oauth/token`
     * `apiEndpoint` is `https://<userName>.auth0.com/api/v2/users/`

 For 500 Mb Free services on MongoDB databases, signup [here](https://www.mlab.com/signup) (or you can use any other service of your choice).
 Note : For Auth0 credentials refer to [README.md](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/client/src/Auth/README.md)

* To install all the require modules and build file:

```
npm install
npm run build
```

* Before testing APIs on your local node server, please follow any of the following instructions according to requirement(s) (this might take some time)

    * To add all the data
       ```
       npm run all
       ```
    * To add electricity data
      ```
      npm run electricity
      ```
    * To add flights data
      ```
      npm run flights
      ```
    * To add vehicles data
      ```
      npm run vehicle
      ```
    * To add trains data
      ```
      npm run trains
      ```
    * To add trees data
      ```
      npm run trees
      ```
    * To add appliance data
      ```
      npm run appliance
      ```
* For details about using API, checkout [postman](./Postman-guidelines) folder for futher instructions to get an example of all the APIs.

* To start the server, run `npm start`.

* To run the unit tests, use `npm test`.

Documentation
-------------
* `npm install -g gitbook-cli`

* `cd docs && gitbook serve`  to view the documentation.

Package
-----
* Check our [npm package](https://gitlab.com/vedularaghu/aossiecfe/)

Licenses
---------
* GNU-GPL-3.0

* CC-By-NC-ND [![License](https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-nd/4.0/)


Contributions
-------------

- If you would like to contribute to the development of this project, please [contact the developers](mailto:bruno.wp@gmail.com).
- While requesting a Merge Request , please submit it to the 'develop' branch (not to the master branch).
- The commits on the develop branch will be periodically merged to the master branch and pushed into production. 
- For further contribution guidelines, follow the [contributions](./CONTRIBUTING.md) page


