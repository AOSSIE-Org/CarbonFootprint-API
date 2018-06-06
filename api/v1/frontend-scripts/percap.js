//This file logs the json required for percap frontend.
const percap = require('../../../raw_data/percap.json');
let obj={};
for (js in percap){
  obj[percap[js]["Country"]]={
      
  }
for (i = 0; i < 22; i++) {
    currYear=1990+i;
    obj[percap[js]["Country"]][currYear]=percap[js][currYear];
}
}
console.log(JSON.stringify(obj));