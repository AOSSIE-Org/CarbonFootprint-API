# Carbon Footprint API

This project aims to have a universal API to find carbon footprint of almost anything. To know more about it check [here](https://carbonhub.org/help)

Following are the links for live APIs and docs:<br/>
&nbsp;&nbsp;&nbsp;[carbonhub.org](https://carbonhub.org/)<br/>
&nbsp;&nbsp;&nbsp;[docs](https://docs.carbonhub.org/)

# Prerequisites

At the time of development we were using :  
  - `npm : v6.9.0` or higher
  - `node : v10.15.3 (LTS)` or higher
  - `redis`

To check your current versions :

```
  npm --version
  node --version
```

# Building and Development Versions (v1)

Find .env.example [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/.env.example) and auth0-config.js.example [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth/auth0-config.js.example) , fill these files with your own credentials. To get all the credentials follow below steps:-

### Database
* We will use Mongodb Atlas that provides cloud database services for setting up our mongodb databse. If you don't have an account  signup [here](https://www.mongodb.com/cloud/atlas)
* After creating new account start with creating a new cluster. It may take 1–3 minutes for the cluster to be created.
* Then click on the `Connect` button right under the cluster name. 
* After that Whitelist your IP. go to `network access` option under security tab and add your machine's IP or `0.0.0.0` to connect from anywhere.
* Then create new MongoDB Atlas user and remember the password. To create new MongoDB Atlas user go to `databse access` option under security tab.
* While creating user chose the user as admin.
* After this it will show different options to connect, go with the `connect your application` option.
* chose driver option to NodeJS and latest version. and copy the connection string to use it in our code.
* you have to extract all the database related credentilas from this connection string. You will need to change the <password> text with your password that you set up when creating the MongoDB Atlas user.
* Add ___.env___ [here](https://gitlab.com/aossie/CarbonFootprint-API) with the same format as [.env.example](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/.env.example). fill the `database configuration' in ___.env___   with the credentials obtained in above steps. 

For 500 Mb Free services on MongoDB databases, signup [here](https://account.mongodb.com/account/register) (or you can use any other service of your choice).

### Auth0
* To set up Auth0 and get all credentials click [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth)
* Add `clientId` from the client you created above.
* `domain` is `<userName>.auth0.com`.
* Add `callbackUrl` with the one you added while making a client.
* `tokenEndpoint` is `https://<userName>.auth0.com/oauth/token`
* `apiEndpoint` is `https://<userName>.auth0.com/api/v2/users/`
* Add [auth0-config.js]() [here](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth) with the same format as [auth0-config.js.example](https://gitlab.com/aossie/CarbonFootprint-API/tree/master/client/src/Auth/auth0-config.js.example)
and fill with the credentials obtained above.
* Add the `jwksUri` with `https://<userName>.auth0.com/.well-known/jwks.json` for example `https://footprintcarbon.auth0.com/.well-known/jwks.json`.
* Add the `issuer` with `https://<userName>.auth0.com/`

### Microsoft API key
* Add Microsoft Bing distance matrix API key. Find one [here](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key).

### Redis
* Install and setup redis locally.
* Add the `redis host`, default being `127.0.0.1`
* If setting up with the help of docker set the host value as `redis`
* Add the `redis port`, default being `6379`

`After following above steps you will get all the credentials required for this project. fill .env properly with all the values.`

### To install all the require modules and build file:  
  - For server, run the following commands in the project root directory.
    ```
    npm install
    ```
  - To install client side dependencies run in `client` directory:
    ```
    npm install
    ```
  - Before testing APIs on your local node server, please follow any of the following instructions according to requirement(s) (this might take some time). basically with these commands appropriate scripts will run and will fill the database for successful working of our APIs. 

    * To add all the data(`recommended`)
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

Development procedure
----
**Using npm command**
* To start the API server, run `npm start` in project root directory. make ensure your redis-server is running.

* To start the client side development server run `npm start` in `client` directory.

* To run the unit tests, use `npm test`.

**Using docker**

* To start the application in development environment, run `docker-compose -f docker-dev-compose.yml up`

* To run the unit tests, use `docker run <web_container_id> npm run test`.

* To start the application in production environment, run `docker-compose up`.

API Testing
-----------
* For testing using Postman refer [here](https://gitlab.com/aossie/CarbonFootprint-API/-/blob/master/Postman-guidelines/README.md).
* An alternative is to use `Swagger`. Go to `Swagger Documentation` present in the sidebar of the Profile page on live website.
* Select which server you would like to test. 
* To add authorization to all the APIs click on the `Authorize` button and enter the API key whih you will get from the profile page. If you want to do it only for any partiular API call then click on the lock symbol beside that particular API and enter the API key.
* To test an API click on `Try it out` button and edit the body of the request as per your wish. Click on execute to check the response.   

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


