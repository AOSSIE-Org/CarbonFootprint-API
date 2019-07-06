// This file logs the json required for percap frontend.
// eslint-disable-next-line import/no-unresolved
const percap = require('@raw_data/percap.json');
// get the logger
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');

const obj = {};
for (let js = 0; js < percap.length; js++) {
  obj[percap[js].Country] = {};
  for (let i = 0; i < 22; i++) {
    const currYear = 1990 + i;
    obj[percap[js].Country][currYear] = percap[js][currYear];
  }
}
Logger.info(`Payload: ${JSON.stringify(obj)}`);
