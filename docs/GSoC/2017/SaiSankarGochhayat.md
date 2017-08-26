# CO2 EMISSIONS API
### Student - Sai Sankar Gochhayat
### Project Link - https://gitlab.com/aossie/CarbonFootprint-API
### Live Project - https://carbonhub.xyz
### Documentation - https://docs.carbonhub.xyz
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

 The app is hosted on AWS , using [nginx](https://www.nginx.com/resources/wiki/) and a MongoDB server. We are using [PM2](http://pm2.keymetrics.io/) as process manager for node js. Deploy script is implemented to allow one click update. We are using CloudFlare for DNS management and SSL certificates.

### Merge Requests - 
1. [ Merge request !1](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/1) - Initial Prototype - Status: *Merged*
    * Basic Express App structure along with Per Capita Emission Visualisation.
2. [ Merge request !2](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/2) - Adding Yarn as a package manager. - Status: *Merged* 
    * Added the yarn.lock file.
3. [ Merge request !3](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/3) - Adding test frameworks and mongoose. - Status: *Merged* 
    * Adding MongoDB driver and test framework in dependencies.
4. [ Merge request !7](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/7) - added a basic function to calculate the emissions from the DB - Status: *Merged* - *Along with Rohit Gupta*
    * DB scripts made.
    * Organized raw data and made respective JSON.
    * Emission Routes added.
    * General Schema decided and implemented.
5. [ Merge request !8](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/8) - This MR addresses the flights and vehicle-related emissions. - Status: *Merged* - *Along with Rohit Gupta*
    * Adding data for flights and vehicles.
    * Adding specific routes for flights and vehicles.
    * Designing interpolation and extrapolation functions in the general function.
    * Readme added for the routes.
6. [ Merge request !9](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/9) - Documentation and multiple endpoints added - Status: *Merged* - *Along with Rohit Gupta*
    * Implementing test cases for the API using mocha.
    * Gitbook docs implemented with theme-api look.
    * Documentation for all the newly added routes.
    * Data injection into the DB.
7. [ Merge request !11](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/11) - Addition of Google Map API, Trees and Train data and End points for the same. - Status: *Merged*   - *Along with Rohit Gupta*
    * Addition of trees data.
    * Implementation of the train route.
    * Adapting to Google Map Distance Matrix for the distance between two points.
    * Improvising vehicle route with data from Map API.
8. [ Merge request !14](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/14) - Added visualisations for electricity emissions - Status: *Merged*   - *Along with Rohit Gupta and Vaibhav*
    * Using a React framework for a new front-end client.
    * Using D3.Js for electricity emission visualization.
    * Repository restructure.
    * Use of Webpack.
9. [ Merge request !16](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/16) - Percapita and Flights visualization. - Status: *Merged*   - *Along with Rohit Gupta*
    * This MR contains percapita emission ported from ejs to react.
    * And Flights visualization.
    * Clean up of ejs and bootstrap files from the repository.
    * Design of front end scripts to create JSON's for the visualizations.
10. [ Merge request !18](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/18) - User Authentication Module - Status: *Merged*   - *Along with Rohit Gupta*
    * Implementation of Auth0 for user authentication. 
    * Adding Express dependencies for the addition of user module.
    * Social login implemented.
11. [ Merge request !21](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/21) - User profile and API key allocation. - Status: *Merged*   - *Along with Rohit Gupta*
    * Creation of routes for creation, retrieval, and deletion of API key.
    * User model for API key storage.
    * Implementation of rate limiting and allowance renewal every 24 hours.
    * Profile page designing.
12. [ Merge request !22](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/22) - Docs - Status: *Merged*   - *Along with Vaibhav*
    * Documentation for Auth0 and API key routes.
    * Addition of sample POST requests in different languages.
    * Addition of contribution guidelines.
    * Addition of sample .env and config files to help developers make local setup.
13. [ Merge request !24](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/24) - Test Case Approximation Fix and Spell check in docs. - Status: *Merged*   
    * Documentation check and grammer check.
    * Change of test cases to have approximation value checks.
14. [ Merge request !29](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/29) - Appliances Added - Status: *Merged*   
    * Appliances in emission route 
    * DB scripts for appliances
    * Specific appliance route
    * Documentation(live on- docs.carbonhub.xyz) added (also includes removal of auth related docs from live website.)
    * Test Cases for appliances.
    * Tree data changed to negative and controller change to add a note on negative emission responses.
15. [ Merge request !28](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/28) - Issue#24 - Status: *Merged*  - *Along with Vaibhav*
    * Fixing DB scripts back to config variables.
    * Merge conflicts on poultry data.
    * Response code changed for errors.
16. [ Merge request !30](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/28) - Opposite - Status: *Merged* 
    * Route to find the quantity of an element given its emission is known.
    * Docs and test cases for quantity route.
17. [ Merge request !32](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/32) - Deploy script - Status: *Merged* 
    * Deployment script to make hassle free integration.
18. [ Merge request !33](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/33) - Appliances Visualisation and Google Analytics tracking code added. - Status: *To be Merged* - *Along with Rohit Gupta*
    * Applianced Visualization 
    * Google Analytics tracking code added.
    * Minor fix