# CarbonFoorprint-API
### Student - Raghavendra Vedula
### Project Repository: https://gitlab.com/aossie/CarbonFootprint-API

### CarbonFootrprint API : 
*This project aims to improve the existing RESTful API, that is to improve the functionalities of the existing API of Carbon Emissions. This includes both front-end as well as backend improvisations for more reliability on the API for the emission data. At the same time, it focuses on increasing the standards and quality of the API as well as the data endpoints. This will increase the versatility of the code base, and make it reliable for the corporate/companies to use the API for calculating carbon emission.*

### Work Details
 CarbonFootprint-API is a one-stop API for calculating the emission amount of various gases (prevalently Carbon dioxide) of day to day objects, trains, planes and many more. Our aim was to increase the standards, scope, and versatility of the existing API. The project was evenly divided into three phases. In the first phase, an API Explorer page was developed using React JS. In this page, the user is provided with an option of entering the data, response of whose will be calculated through the API. This feature helps in testing the API, check for the response of the data user needs, and examine the structure of the response data. The user is provided with an option of executing the code in the Postman. There is also an option of getting the code of the request and response in various programming languages. Later in this phase, various test files were written using [JEST](https://jestjs.io/) for the API Explorer and existing API. 

During the second phase, a web portal was designed on the profile page which serves for the purpose of suggesting data to our API. There are two parts to this data suggestion page, one is structured data whose schema was similar to our existing database schema, and the other one was unstructured data which has an upload option. The structured data page is designed using [react-jsonschema-form](https://mozilla-services.github.io/react-jsonschema-form/). The main aim for using react-jsonschema-form is to get the front-end data directly in the JSON format of our existing data. The unstructured data page has an upload option, where users can upload a file which has emission data, not present in our API. Apart from the suggestion page, a data verify page is designed for the developers to verify the data and approve/reject the authenticity of the data. If the data gets approved, it gets appended into our existing database else gets deleted. All the endpoint of the API are present in the data suggestion page and hence serves even as an endpoint explorer.  

In the final phase, an additional feature of data suggestion was implemented. This feature lets the approved data to be appended in the existing front-end visuals. It helps in eliminating the process of manually adding the approved data to the front-end visuals. In the later part, an NPM package of our API was developed which helps to eliminate the use of cumbersome CURL requests. This package also eliminates the use of multiple API calls inside the code. 
### Merge Requests 
1. [ Merge request !82](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/82) - API Explorer backend.
    * API explorer front-end and backend implementation
2. [ Merge request !84](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/84) - CORS Authorization.
    * Include access-key in CORS headers for fetching data through API Explorer.
3. [ Merge request !92](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/92) - Integration Test
    * Integration test file of API Explorer
    * Existing mocha test file converted to JEST.
4. [ Merge request !94](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/94) - API Explorer Documentation
    * Steps to use the API Explorer
    * Documentation of the API Explorer code
5. [ Merge request !97](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/97) - Data upload front-end and Backend
    * Data Upload page for users to add/suggest new data for various routes with a structured and unstructured format.
    * react-jsonschema-form has been used for directly getting the JSON from the form data. 
    * Provided verify Data route for the developers to verify the data and approve it.
6. [ Merge request !103](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/103) - Data Upload Documentation
    * Detailed explanation for using the data upload page.
    * Documentation of the code.
7. [ Merge request !104](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/104) - Append approved data to the front-end visuals
    * Automate the process of adding the approved data to the front-end visuals. 
8. [ Merge request !107](https://gitlab.com/aossie/CarbonFootprint-API/merge_requests/14) - npm package
    * Mentioned about the npm package of our API in README
9. [ NPM Package](https://gitlab.com/vedularaghu/aossiecfe) - npm package of CarbonFootprint-API
    * NPM package of CarbonFootprint-API
    * Detailed explanation of using the package
