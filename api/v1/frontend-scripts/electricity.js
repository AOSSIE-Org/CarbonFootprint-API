// This file logs the json required for electricity frontend.
// eslint-disable-next-line import/no-unresolved
const countryCode = require('@raw_data/countrycode.json');
// eslint-disable-next-line import/no-unresolved
const electricity = require('@raw_data/electricty_emission.json');
// get the logger
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');

const findcode = country => {
  for (let cs = 0; cs < countryCode.length; cs++) {
    if (countryCode[cs].name === country) {
      return countryCode[cs].code;
    }
  }
  return null;
};
const obj = {};
for (let js = 0; js < electricity.length; js++) {
  if (findcode(electricity[js].Country)) {
    obj[findcode(electricity[js].Country)] = {
      name: electricity[js].Country,
      CO2: electricity[js]['Consum-CO2'],
      CH4: electricity[js]['Consum-CH4'],
      N2O: electricity[js]['Consum-N2O'],
      unit: 'kg/kWh',
    };
  }
}
Logger.info(`Payload: ${JSON.stringify(obj)}`);
