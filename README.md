# Carbon Footprint API

This project aims to have a universal API to find carbon footprint of almost anything.

# Prerequisites

At the time of development we were using :
`npm : 5.0.3` or higher
`node : v8.1.2` or higher

To check your current versions :

```
  npm --version
  node --version
```

# Building and Development Versions (v1)

* In the root of repository add config.json file.

```
{
    "database":{
        "username": <username>,
        "password": <password>,
        "port": <serving port>
        "dbname": <database name>,
        "hostname": <host name>
    },
    "apikeys":{
        "googlemap": <Google Maps API key>
    }

    
}
```

 For 500 Mb Free services on MongoDB databases, signup [here](https://www.mlab.com/signup) (or you can use any other service of your choice).

* You need to now run all scripts at [this directory](https://github.com/r0hit-gupta/CarbonFootprint-API/tree/master/api/v1/db_scripts) as instructed below:  

```
npm install/yarn install
cd api/v1/db_scripts
nodemon electricity_db.js
nodemon  electricity_db_generation.js
nodemon electricity_db_td.js
nodemon flights_db.js
nodemon vehicle_db.js
cd ../../.. && npm run build
```

Note : We prefer [yarn](https://yarnpkg.com) over [npm](https://www.npmjs.com), for details on yarn installation and usage [click here](https://yarnpkg.com/en/docs/usage)

* To start the server, run `npm start`.

* To run the unit tests, use `npm test`.


Documentation
-------------
*`npm install -g gitbook-cli`

*`cd docs && gitbook serve`  to view the documentation.

Licenses
---------
* GNU-GPL-3.0

* CC-By-NC-ND [![License](https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-nd/4.0/)


Contributions
-------------

If you would like to contribute to the development of this project, please [contact the developers](mailto:bruno.wp@gmail.com).
