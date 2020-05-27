// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// eslint-disable-next-line import/no-unresolved
const redis = require('@framework/redis');
const Emission = require('../models/emissionModel');
// import Redis client
const { redisClient } = redis;

// eslint-disable-next-line arrow-body-style
// to get all the rawData
exports.fetchRawData = () => {
  // Logger.info('entered fetchrawdata');
  let rawData;
  return new Promise((resolve) => {
    redisClient.hget('rawdata', 'types', (err, result) => {
      // Logger.info('entered redis');
      if (err || !result) {
        // get rawdata from database
        let vehicleTypes = Emission.find(
          {
            categories: ['vehicle', 'transport'],
          },
          (err1, data) => {
            if (err1 && !data) {
              Logger.error(err1);
            }
          },
        );
        vehicleTypes = vehicleTypes.map(item => item.item);
        // to get appliance types
        let applianceTypes = Emission.find(
          {
            categories: ['appliances'],
          },
          (err1, data) => {
            if (err1 && !data) {
              Logger.error(err1);
            }
          },
        );
        applianceTypes = applianceTypes.map(item => item.item);

        // to get poultry types
        let poultryTypes = Emission.find(
          {
            categories: ['poultry'],
          },
          (err1, data) => {
            if (err1 && !data) {
              Logger.error(err1);
            }
          },
        );
        poultryTypes = poultryTypes.map(item => item.item);
        rawData = { vehicleTypes, applianceTypes, poultryTypes };
        redisClient.hset('rawdata', 'types', JSON.stringify(rawData));
      } else {
        // Logger.info('result', JSON.parse(result));
        rawData = JSON.parse(result);
      }
      resolve(rawData);
    });
    // Logger.info('exit fetchrawdata');
  });
};
