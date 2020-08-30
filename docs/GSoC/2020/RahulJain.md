# **CarbonFootprint-API**

> Google Summer of Code '20 Final Submission Report

### **Student** - _Rahul Jain_

### Links

- **Project Repository:** https://gitlab.com/aossie/CarbonFootprint-API
- **Live Project:** https://carbonhub.org
- **Swagger API Documentation:** https://carbonhub.org/api/docs
- **Project Documentation:** https://docs.carbonhub.org

### Google Summer of Code '20:
_This year the focus was to restructure the backend and add some brand new features. apart from this there was also need to smoothen the deployment process via gitlab CI/CD and take database backup regularly. new features like googlefit, Sentry were integrated._

I knew these 3 months are going to be super excited for me and will bring a lot of challenging opportunities for me. Before the coding period began I interacted with my mentors and tried to become friendly with them. After the introductory meeting we started to plan the work and they suggested me to make trello cards for my work. It was very nice idea and it helped me to get my work done on time.

This is the entire summary of my work:-

Week 1:
- I begin my work by fixing some existing opened issues that need to be fixed urgently and made  PRs accordingly. After this i begin working according to my trello cards. according to 1st trello card i added some more tests to the app. first i added some 		backend tests to improve it more. Then i felt some need to add frontnd tests also, therefore i set up enzyme for frontend 					testing and add some intial tests for frontend. 

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
- this week proved to be very important and challenging for me. it wouldn't be possible without the help of mentors to do this task. the task was to automate the deployment process for our app through gitlab CI/CD. within a single click we can deploy our app compared to previously done manual process. This task was extended till next week.

Week 9:
- In this week i continued with the process of making deployment automated. actually the problem came while passing env variables during building docker image but finally with the help of mentors it became successful and our deployment process became smoother just within a single click.

Week 10:
- the task was to write scripts to take backup of mongodb databse and then store this backup in google buckets at regular intervals.
To do this regularly I was asked to write cron-job for this task therfore the next half of week was devoted writing cron jobs. To store mongodump two buckets were created, private nad public. private bucket is used to store all the user specific data and public bucket is used to store raw data.

Week 11:
- the task of this week was to dockerize the cron job and run it as an independent service apart from our main server. i wrote dockerfile and made other related necessary changes.

Week 12:
- I used already made google-fit react components and connected them with the APIs written before. I displayed the fit data of a particular user in the form of bar graph. coming to the end of this week I prepared the work report of my entire Gsoc 2020 journey.  


### Merge Requests

- [**MR !188**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/188)(_**merged**_)
	- this PR improved error handling while we add daily-emissions in emissions chart. 
	- complete set of new APIs were written for dynamic rendering of dropdown contents.

- [**MR !211**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/211)(_**merged**_)
	- Added some much needed backend tests.
	- Configured enzyme for frontend testing and written some frontend tests.

- [**MR !212**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/212)(_**merged**_)
	- Done complete restructuring of backend side.
	- Increased the granularity of APIs by adding services to each set of APIs.
	- Fixed breaking changes after restructuring.

- [**MR !216**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/216)(_**merged**_)
  - Created new schema for storing google fit data.
	- written APIs to fetch google-fit data
	- written helper functions to fetch and store data in database.

- [**MR !222**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/222)(_**merged**_)	
	- fixed issue [188](https://gitlab.com/aossie/CarbonFootprint-API/-/issues/188) 

- [**MR !224**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/224)(_**merged**_)
	- updated readme 

- [**MR !223**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/223)(_**merged**_)
	- fixed issue [190](https://gitlab.com/aossie/CarbonFootprint-API/-/issues/190)
	- fixed failing frontend tests

- [**MR !229**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/229)(_**merged**_)
	- automated the process of deployment

- [**MR !234**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/234)(_**merged**_)
	- fixed failing tests

- [**MR !231**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/231)(_**merged**_)
	- added cron-job to take backup of database and save mongodump to google buckets
	- dockerize cron job

- [**MR !239**](https://gitlab.com/aossie/CarbonFootprint-API/-/merge_requests/239)(_**merged**_)
	- connect google-fit backend with frontend

