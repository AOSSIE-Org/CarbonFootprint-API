<img src="https://i.imgur.com/MXb1jv6.png" align="center" width="500" height="100"/>

# GSoC 2018 Work Product - Rishabh Shukla

**Student** : [Rishabh Shukla](https://gitlab.com/rishz)

**Organisation** : [AOSSIE](http://aossie.org/)

**Project Repository** : [Carbon Footprint API](https://gitlab.com/aossie/CarbonFootprint-API)

## About the Project

The project deals with calculating the Carbon Emissions from various sources in the world like food, appliances, vehicles and presenting it through a REST-API and an interface. The aim is to create a universal converter to CO2.
The project contains a number of visualizations to help understand the generic emission patterns.

## Technical details

I started the Google Summer of Code by creating a basic layout of API Explorer in which I
initialized the functions and laid a configuration in which I instantiated the React components. Then, I configured the back-end of the API Explorer in which I linked the React components to the API logic, which would fetch the responses to the requests. Additionally, I added a Generate Code feature to the Explorer, using which the user can get the language specific code for their API query. A 'Run in Postman' button was added through which the user can execute the API Endpoints in the Postman app. Side by side, I refactored the code and added a custom error middleware in the app.

During the second phase, I improved the UI-UX of the API Explorer and made all the React components responsive. The major challenge of this phase was configuring [Redis](https://redis.io/) as the cache store in the app which made the queries and API Key fetching extremely fast.
Later in the phase, I implemented a Logger which would essentially keep all the logs away from production and kept them in a single file.

In the last phase, I expanded the API by adding the new data points to the [MongoDB](https://www.mongodb.com/) using scripts. Added new API endpoints by calculating the carbon emissions from new data points. Added the API documentation in [Gitbook](https://www.gitbook.com/) and added the test cases for testing the new API endpoints.
The last task was to add the visualizations in the app which gave a graphical overview of the global emissions of various sources.

## Merge Requests

1. [Merge Request !80](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/80) [*Merged*] - Basic configuration of API Explorer
    * Added basic layout and front-end of the API Explorer.
    * Initialised methods and components.
    * Added UI and Styles for API Explorer.

2. [Merge Request !81](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/81) [*Merged*] - Added Custom error middleware
    * Added Custom error middleware for distinguishing API error types.

3. [Merge Request !83](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/83) [*Merged*] -  Refactoring code as per ES6
    * Improved the code by refactoring it as per ES6 standards.

4. [Merge Request !85](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/85) [*Merged*] -  Added an option to generate code
    * Added an option for generating language specific code of the query.

5. [Merge Request !89](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/89) [*Merged*] -  Added an option to test the API with Postman Collections
    * Added an option to test the API with Postman Collections
    * Updated Postman_collection.json
    * Added examples with request and response separately in Postman

6. [Merge Request !90](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/90) [*Merged*] -  Added an option to generate code
    * Added option to generate language specific code for each query
    * Added Copy to Clipboard option

7. [Merge Request !78](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/78) [*Merged*] -  Added Security for headers in the app
    * Added Helmet in the Express App which secures HTTP, XSS headers, prevents Clickjacking, removes the X-Powered-By header and controls browser DNS prefetching

8. [Merge Request !91](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/91) [*Merged*] -  Corrected Postman json import link
    * Corrected postman JSON import link in Postman Guidelines.

9. [Merge Request !96](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/96) [*Merged*] -  Improved UI-UX
    * Made components responsive for Mobile and tablets
    * Refined UI-UX
    * Updated semantic-ui-react (to include Responsive.js)

10. [Merge Request !98](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/98) [*Merged*] -  Configured Redis in app
    * Configured Redis as the cache data-store in the app in order to improve querying speed.
    * Used Redis in key processing.
    * Used Redis to cache emission queries to improve speed.
    * Added steps in documentation to configure Redis.

11. [Merge Request !100](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/100) [*Merged*] -  Configured Logger in app
    * Removed all console.log statements from the server side.
    * Added Winston logger
    * Configured logs to be in a single file

12. [Merge Request !101](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/101) [*Merged*] -  Fixed API Explorer
    * Fixed API Explorer JSON Editor and Params
    * Fixed Search bar
    * Added Documentation
    * Formatted response

13. [Merge Request !102](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/102) [*Merged*] -  Added datasets via DB scripts
    * Studied datasets and added relevant global datasets in the MongoDB using the scripts

14. [Merge Request !105](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/105) [*Open*] -  Created new API Endpoints
    * Calculated Carbon Footprint for new data points and added endpoints for them in the API.

15. [Merge Request !106](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/106) [*Open*] - Added documentation of API Endpoints
    * Added documentation of API endpoints in Gitbook.
    * Added code examples

16. [Merge Request !108](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/108) [*Open*] -  Added API test cases
    * Added new API tests
    * Refactored code

17. [Merge Request !109](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/109) [*Open*] -  Added visualisations with tooltip for new API data points
    * Added visualizations with tooltip for new API data points


## Few Screenshots

<img src="https://i.imgur.com/PpUjuOG.png" align="center" width="700" height="350"/>

<img src="https://i.imgur.com/D2gRWNx.png" align="center" width="700" height="350"/>

<img src="https://i.imgur.com/EcQqk6a.png" align="center" width="700" height="350"/>

## Future Work

New visualizations and relevant data points can be added to broaden the API.  New interfaces for comparing the emissions generated by sources can be added. The project needs to be actively maintained.
