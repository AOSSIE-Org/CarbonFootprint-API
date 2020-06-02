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
  let rawData;
  return new Promise((resolve) => {
    // get rawdata from redis cache
    redisClient.hget('rawdata', 'types', async (err, result) => {
      if (err || !result) {
        // get rawdata from database

        let vehicleTypes = await Emission.find(
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
        let applianceTypes = await Emission.find(
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
        let poultryTypes = await Emission.find(
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

        // to get train Types
        let trainTypes = await Emission.find(
          {
            categories: ['trains', 'transport'],
          },
          (err1, data) => {
            if (err1 && !data) {
              Logger.error(err1);
            }
          },
        );
        trainTypes = trainTypes.map(item => item.item);

        rawData = {
          vehicleTypes, applianceTypes, poultryTypes, trainTypes,
        };
        redisClient.hset('rawdata', 'types', JSON.stringify(rawData));
      } else {
        // Logger.info('result', JSON.parse(result));
        rawData = JSON.parse(result);
      }
      resolve(rawData);
    });
  });
};
