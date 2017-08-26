# CO2 EMISSIONS API
### Student - Rohit Gupta
### Links  
* **Project Repository:** https://gitlab.com/aossie/CarbonFootprint-API
* **Live Project:** https://carbonhub.xyz
* **Documentation:** https://docs.carbonhub.xyz
<!-- * **Project's Tag at the end of GSoC:** -->

### CarbonFootrprint API : 
*This project aims to build a RESTful API, that is the one place to go to for any information that you require on Carbon Emissions. The aim is to create a universal converter to CO2. The project contains a number of visualizations to help understand the generic emission patterns.*

### Technical Details https://docs.carbonhub.xyz
### Starting and Ending GSoC tag - 
### CarbonFootrprint API - *This project aims to build a RESTful API, that is the one place to go to for any information that you require on Carbon Emissions. The aim is to create a universal converter to CO2. The project contains a number of visualizations to help understand the generic emission patterns.*
### More about Carbon Footprint API -
 The [CarbonFootprint API](https://carbonhub.xyz) provides a REST API service serving information related to carbon emission. The project was started from scratch in the GSoC 2017 summer period. This is a MERN stack based Web Application. 
 Technology stack we are using - 

 * [ExpressJS](https://expressjs.com/) - Handles the API requests and the backend services.
 * [MongoDB](https://www.mongodb.com/) - Database used for the project.
 * [React](https://facebook.github.io/react/) - React and Semantic UI is used to create the front end for the project.
 * [yarn](https://yarnpkg.com/en/) - The package manager used by us.
 * [Gitbook](https://www.gitbook.com/) - Used to create the [documentation](docs.carbonhub.xyz) for the project.
 * The other packages we are using you can find [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/package.json).
 
 We started the summer with API basic functionalities, that is defining the routes, the controller and a schema for the emission elements. As suggested by Bruno we made a general DB schema that could handle all atomic and compound elements related to emissions. This schema was a major challenge that we faced, however, we did manage to put a unified schema for the same. 
 
 Once the general route and the schema were setups we moved on to make specific routes to provide detailed information and perform combined operations like calling the [Distant Matrix API](https://developers.google.com/maps/documentation/distance-matrix/intro) , parsing the results and calculating the most accurate results for the emissions produced. The next task was to create the visualizations for the respective type of emissions that would help the user understand and gain insights from the data.We decided to take up React as the choice of front end framework. This was based on the popularity of react as well as the flexibility it provides in terms of components and attractive features like virtual dom. Adapting to react and webpack was a bit difficult in the beginning. 

 Meanwhile, we decided to take up Gitbook as a choice for documentation low learning curve and the simplicity of **.md** files. It provided a great theme for API documentation that you can find [here](https://github.com/GitbookIO/theme-api).And we are using [Supertest](https://www.npmjs.com/package/supertest) alongside mocha for route testing.

 The next task was to make a user module and handle authentication. After a through discussion among passportjs and Auth0, we decided to go with Auth0. Auth0 documentation was a bit of hassle to grasp to, but finally, we managed to implement the user authentication. We are using Amazon SES to send transactional emails. And auth0 handles authentication. Now on the Express end we have an authentication module that helps keeps tracking API access. API access is restricted to authenticated users who are allowed an access key which is passed as a header in every API request to make an authenticated query. Currently, we are providing each user 1000 requests per day. 
 
 We have added to implement a reverse route for finding quantity if the emission value is provided. And more visualizations based on appliances.

 The app is hosted on AWS, using [nginx](https://www.nginx.com/resources/wiki/) and a MongoDB server. We are using [PM2](http://pm2.keymetrics.io/) as process manager for node js. Deploy script is implemented to allow one click update. We are using CloudFlare for DNS management and SSL certificates.

### Merge Requests  
1. [ Merge request !4](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/4) - Restructured the API and configured mongoose - Status: *Merged*
    * Basic API structure.
    * Mongoose integration with exception handling.
2. [ Merge request !7](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/7) - added a basic function to calculate the emissions from the DB - Status: *Merged* - *Along with Saisankar Gochhayat*
    * A universal database schema created for every type of item.
    * A universal recursive function to find the emissions of every item.
    * Electricity emission data added.
    * Few unit tests integrated.
3. [ Merge request !9](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/9) - Documentation and multiple endpoints added - Status: *Merged* - *Along with Saisankar Gochhayat*
    * Helper functions like interpolation added.
    * Vehicles and flight emission data added.
    * A general and type specific API routes created.
    * Created scripts to extract information from raw data.
    * Setup documentation for all the routes.
4. [ Merge request !14](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/14) - Added visualisations for electricity emissions - Status: *Merged* - *Along with Saisankar Gochhayat and Vaibhav Sharma*
    * Added train emission data.
    * Configured Webpack and React for the frontend.
    * Initiated frontend design.
    * Added electricity emission data visualisation.
5. [ Merge request !18](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/18) - User Authentication Module - Status: *Merged* - *Along with Saisankar Gochhayat*
    * Setup user authentication system using Auth0.
    * Integrated authentication module on frontend. 
6. [ Merge request !19](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/19) - Color scale fix for electricity visualisation - Status: *Merged* 
    * Fixed color scale for the electricity visualisation. 
7. [ Merge request !20](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/20) - Uneven map stroke width fix - Status: *Merged*
    * Fixes uneven stroke width of the map for the electricity visualisation.
8. [ Merge request !23](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/23) - Support for Gitlab Continuous Integration - Status: *Merged* 
    * Refactored code for Gitlab Continous Integration.
    * Update unit tests.
9. [ Merge request !26](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/26) - fix: Safari visualisations - Status: *Merged*
    * Fixed bugs for Safari browser
10. [ Merge request !27](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/27) - test: Update value for tree absorption - Status: *Merged* 
    * Update unit tests.
11. [ Merge request !33](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/33) - Appliances Visualisation and Google Analytics tracking code added. - Status: *To be Merged* - *Along with Saisankar Gochhayat*
    * Appliance's Visualization 
    * Google Analytics tracking code added.
    * Minor fix