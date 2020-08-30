# **CarbonFootprint-API**

> Google Summer of Code '20 Final Submission Report

### **Student** - _Rahul Jain_

### Links

- **Project Repository:** https://gitlab.com/aossie/CarbonFootprint-API
- **Live Project:** https://carbonhub.org
- **Swagger API Documentation:** https://carbonhub.org/api/docs
- **Project Documentation:** https://docs.carbonhub.org

### Google Summer of Code '20:
_This year the focus was to restructure the backend and add some brand new features. new features like googlefit, Sentry were integrated._

Before the coding period began I interacted with my mentors and tried to become friendly with them. After the introductory meeting we started to plan the work and they suggested me to make trello cards for my work. It was very nice idea and it helped me to get my work done on time.

I will summarize my whole work done in weeks:

Week 1:
- I begin my work by fixing some existing opened issues that need to be fixed urgently ande PRs accordingly. After this i begin 			working according to my trello cards. according to 1st trello card i added some more tests to the app. first i added some 					backend tests to improve it more. Then i felt some need to add frontnd tests also, therefore i set up enzyme for frontend 					testing and some intial tests for frontend. 

Week 2:
- This week was one of the crucial weeks as my task was to restructure the backend. there was nothing any majore issue with the current structuring but as the codebase was growing day by day it was becoming difficult to track errors and the files were becoming too large. so as told by my mentor I added services folder in each type of APIs and moved the entire business logic to this folder thereby increasing the granularity further to one step. After this the routes file has become very clean and easy to  
understand.

Week 3:
- This week was a bit more relaxed. I just assured everything was working fine after restructuring of code. after ensuring proper working I began exploring on how to integrate google-fit in our app. after discussing with my mentors I made plans on how to accomplish it. In the end of this week i also tested some APIs using curl to get google fit data.

Week 4:
- I started this week with the creation of new mongodb model to store user's google-fit data. After successfully creating new model i started working on writing actual APIs. i begin slowly but raced up ahead to successfully complete the task before time. Now it was the time for 1st Evaluation so from my side everything was working fine and on time.

Week 5:
- This week was fully concentrated on writing APIs for google-fit. after digging deep into it i found that fit data can be fetched only if user logins via google-oauth. So i wrote APIs for two cases, one if user logins via google-oauth and second if doesn't logins via google-oauth. therefore in this week i wrote controllers and services for direct fetching of data.

Week 6:
- this week i worked on writing APIs for fetching google-fit data if user doesn't login through google-oauth. After writing APIs 
i wrote functions to save data in database and fetch data from database. and then created new credentials on Auth0 and google developer console for production environment. and finally fixed some failing tests.

Week 7:
- After writing backend for google fit, my next task was to update readme and make it more informative and organised. so i refactored readme from scratch.

Week 8: 
- this week proved to be very important and challenging for me. it wouldn't be possible without the help of mentors to do this task. the task was to automate the deployment process for our app. within a single click we can deploy our app compared to previously done manual process. i was not able 

Work done during phase 2:-
Week 1:
Worked on direct fetching of google fit data.
Written controllers and services for the same with api endpoints.
Refactored google fit schema
Tested to ensure proper working.
Week 2:
Worked on indirect fetching of google fit data.
Written controllers and services for the same with api endpoints.
Written services to save and fetch data from database.
Created new required credentials on Google developer console and Auth0 for production environment.
Fix failing tests.
Week 3:
Refactored existing readme and made it more systematic.
Started working on deploying app through gitlab ci/cd.
Week 4:
Finished working on deploying through gitlab ci/cd.
Started working on internal apis.
	
Link to all the PRs:
https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/21688(Merged)
https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/222(Merged)
https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/224(Merged)
https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/223(Merged)
https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/226(Pending)

### Merge Requests
- [**MR !211**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/211)(_**merged**_)
	- Added some much needed backend tests.
	- Configured enzyme for frontend testing and written some frontend tests.

- [**MR !188**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/188)(_**merged**_)
	- this PR improved error handling while we add daily-emissions in emissions chart. 
	- complete set of new APIs were written for dynamic rendering of dropdown contents.

- [**MR !212**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/212)(_**merged**_)
	- Done complete restructuring of backend side.
	- Increased the granularity of APIs by adding services to each set of APIs.
	- Fixed breaking changes after restructuring.

- [**MR !216**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/216)(_**merged**_)
  - Created new schema for storing google fit data.