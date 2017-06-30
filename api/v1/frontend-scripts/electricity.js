var country_code = require('../../../raw_data/countrycode.json');
var electricity = require('../../../raw_data/electricty_emission.json')
// console.log(country_code);
let findcode = (country) => {
  for(cs in country_code)
  {
    if(country_code[cs].name == country)
    {
      return country_code[cs].code;
    }    
  }  
}
var obj={};
for (js in electricity){
  if (findcode(electricity[js]['Country'])){
    obj[findcode(electricity[js]['Country'])]=
              {"name":electricity[js]['Country'],
              "CO2":electricity[js]['Consum-CO2'],
              "CH4":electricity[js]['Consum-CH4'],
              "N2O":electricity[js]['Consum-N2O'],
              "unit":"kg/kWh"
            };
  }
}
jsonStr = JSON.stringify(obj);
console.log(jsonStr);