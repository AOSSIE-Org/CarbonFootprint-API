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

* To install all the require modules and build file:

```
yarn install
yarn run build
```

* Before testing APIs on your local node server, please follow any of the following instructions according to requirement(s) (this might take some time)

    * To add all the data 
       ```
       yarn run all
       ```
    * To add electricity data
      ```
      yarn run electricity
      ``` 
    * To add flights data
      ```
      yarn run flights
      ```
    * To add vehicles data
      ```
      yarn run vehicle
      ```
    * To add trains data
      ```
      yarn run trains
      ```
    * To add trees data
      ```
      yarn run trees
      ```
      
Note : We prefer [yarn](https://yarnpkg.com) over [npm](https://www.npmjs.com), for details on yarn installation and usage [click here](https://yarnpkg.com/en/docs/usage)

* To start the server, run `yarn start`.

* To run the unit tests, use `yarn test`.


Documentation
-------------
* `yarn global add gitbook-cli`

* `cd docs && gitbook serve`  to view the documentation.

Licenses
---------
* GNU-GPL-3.0

* CC-By-NC-ND [![License](https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-nd/4.0/)


Contributions
-------------

If you would like to contribute to the development of this project, please [contact the developers](mailto:bruno.wp@gmail.com).
