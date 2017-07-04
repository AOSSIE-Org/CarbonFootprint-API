var percap = require('../../../raw_data/percap.json');
var obj={};
for (js in percap){
  obj[percap[js]["Country"]]={
      "years":[],
      "values":[]      
  }
for (i = 0; i < 28; i++) {
    obj[percap[js]["Country"]].years[i]=1990+i
    obj[percap[js]["Country"]].values[i]=percap[js][obj[percap[js]["Country"]].years[i]]
}
}

jsonStr = JSON.stringify(obj);
console.log(jsonStr);