
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
  // redisClient.flushdb((err, succeeded) => {
  //   console.log(succeeded); // will be true if successfull
  // });
  return new Promise((resolve) => {
    // get rawdata from redis cache
    redisClient.hget('rawdata', 'types', async (err, result) => {
      if (err || !result) {
        // get rawdata from database

        const Types = await Emission.find(
          {
            categories: {
              $in: ['vehicle', 'trains', 'appliances', 'poultry', 'flights'],
            },
          },
          (err1, data) => {
            if (err1 && !data) {
              Logger.error(err1);
            }
          },
        );

        let vehicleTypes = Types.filter(item =>
          JSON.stringify(item.categories) === JSON.stringify(['vehicle', 'transport']));
        vehicleTypes = vehicleTypes.map(item => item.item);

        let applianceTypes = Types.filter(item =>
          JSON.stringify(item.categories) === JSON.stringify(['appliances']));
        applianceTypes = applianceTypes.map(item => item.item);

        let trainTypes = Types.filter(item =>
          JSON.stringify(item.categories) === JSON.stringify(['trains', 'transport']));
        trainTypes = trainTypes.map(item => item.item);

        let poultryTypes = Types.filter(item =>
          JSON.stringify(item.categories) === JSON.stringify(['poultry']));

        poultryTypes = poultryTypes.map(item => item.item);

        let flightTypes = Types.filter(item =>
          JSON.stringify(item.categories) === JSON.stringify(['flights']));
        flightTypes = flightTypes.map(item => item.item);

        rawData = {
          vehicleTypes, applianceTypes, poultryTypes, trainTypes, flightTypes,
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
