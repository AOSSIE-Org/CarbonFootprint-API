var percap = require('../../../raw_data/percap.json');
var obj={};
for (js in percap){
  obj[percap[js]["Country"]]={
      
  }
for (i = 0; i < 22; i++) {
    currYear=1990+i;
    obj[percap[js]["Country"]][currYear]=percap[js][currYear];
}
}
jsonStr = JSON.stringify(obj);
console.log(jsonStr);