# Pearl-Jam
###This project is divided to two parts:
1. scraping the website pearljam.com/tour to get all the concerts they have scheduled, then insert it to a database (MongoDB)
2. create an express server with two endpoints to cover the queries:
  - ?city=
  - ?startTime=&endTime=
  
  
 both parts uses function from the db.js file
 
 In order to test the project you must:
* install mongodb on your systen
* clone the git repo and use "npm intsall" to download the dependecies
* run mongod (mongo daemon)
* type "npm run partX" (X = 1/2) accordingly.
