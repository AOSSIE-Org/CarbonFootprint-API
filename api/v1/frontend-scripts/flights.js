//This file logs the json required for flights frontend.
var flights = require('../../../raw_data/flights.json');
var distance =  [125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500];
var obj={};
for (js in flights){
  obj[flights[js]["airplane model"]]={
      
  }
for (i in distance) {
    currDist=distance[i];
    if(flights[js][currDist]){
    obj[flights[js]["airplane model"]][currDist]=3.16*flights[js][currDist]/1000;}
}
}
console.log(JSON.stringify(obj));