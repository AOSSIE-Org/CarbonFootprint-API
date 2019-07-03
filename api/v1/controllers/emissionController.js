const spline = require('cubic-spline');
const Logger = require('@framework/Logger');
const redis = require('@framework/redis');
const Emission = require('../models/emissionModel');
// import Redis client
const { redisClient } = redis;

const interpolate = (l1, l2, d) => {
  for (let x = 0; x < l1.length; x++) {
    if (d >= l1[x] && d < l1[x + 1] && x < l1.length - 1) {
      return spline(d, l1, l2);
    }
    if (d >= l1[l1.length - 1]) {
      const slope = Math.abs(
        (l2[l2.length - 1] - l2[l2.length - 2])
          / (l1[l1.length - 1] - l1[l1.length - 2]),
      );
      return l2[l2.length - 1] + slope * (d - l1[l1.length - 1]);
    }
    if (d <= l1[0]) {
      const slope = Math.abs((l2[1] - l2[0]) / (l1[1] - l1[0]));
      return slope * d;
    }
  }
};

/*
 * A helper function to process the emissions of a component.
 */
const processEmission = (emissions, component, region, quantity, item) => {
  Logger.info(`Item name: ${item.item} :: Region: ${item.region}`);
  return new Promise((resolve, reject) => {
    // if component type is atomic return it's emissions
    if (
      item.components[0].name === 'CO2' ||
      item.components[0].name === 'CH4' ||
      item.components[0].name === 'N2O'
    ) {
      for (const component of item.components) {
        if (emissions.hasOwnProperty(component.name)) {
          emissions[component.name] += quantity * component.quantity[0];
          Logger.info(
            `Emissions ${component.name}: ${emissions[component.name]} kg`,
          );
        }
      }
      emissions.type = item.categories[0];
      resolve(emissions);
    }
    // if component type is complex, recurse to find its atomic components
    else {
      const numOfComponents = item.components.length; // number of subcomponents
      (async function () {
        for (let i = 0; i < numOfComponents; i++) {
          if (item.components[i].quantity.length > 1) {
            const getInterpolatedQuantity = await interpolate(
              item.quantity,
              item.components[i].quantity,
              quantity,
            );
            Logger.info(`Interpolated value = ${getInterpolatedQuantity}`);
            await find(item.components[i].name, region, getInterpolatedQuantity)
              .then((emis) => {
                for (const i in emis) {
                  emissions[i] += emis[i];
                }
              })
              .catch(err => reject(err));
          } else {
            await find(
              item.components[i].name,
              region,
              item.components[i].quantity[0],
            )
              .then((emis) => {
                for (const i in emis) {
                  emissions[i] += emis[i];
                }
              })
              .catch(err => reject(err));
          }
        }
      }())
        .then(() => {
          if (item.calculationMethod === 'interpolation') {
            resolve(emissions);
          } else {
            for (const i in emissions) {
              emissions[i] *= quantity;
            }
            resolve(emissions);
          }
        })
        .catch(err => reject(err));
    }
  });
};

/*
 * A function to calculate the emissions of a component.
 * Refer to the Emission schema for more information on the components.
 */
let find = (component, region, quantity) => {
  const emissions = {
    CO2: 0,
    CH4: 0,
    N2O: 0,
  }; // emissions accumulator
  return new Promise((resolve, reject) => {
    if (quantity < 0) reject('quantity cannot be negative');

    // find component in redis
    redisClient.hget('emissions', `${component}[${region}]`, (err, result) => {
      if (err || !result) {
        // find the component in the database
        Emission.findOne(
          {
            $or: [
              {
                item: new RegExp(`^${component}$`, 'i'),
                region: new RegExp(`^${region}$`, 'i'),
              },
              // find the default values if a particular region is not found
              {
                item: new RegExp(`^${component}$`, 'i'),
                region: 'Default'
              },
            ],
          },
          (err, item) => {
            // if component is found
            if (!err && item) {
              processEmission(emissions, component, region, quantity, item)
                .then((result) => {
                  resolve(result);
                })
                .catch((err) => {
                  Logger.error(`Error: ${err}`);
                });
              redisClient.hset(
                'emissions',
                `${component}[${region}]`,
                JSON.stringify(item.toObject()),
              );
            }
            // return an error if component is not found
            else reject(`Unable to find component ${component} for ${region}`);
          },
        );
      } else {
        processEmission(
          emissions,
          component,
          region,
          quantity,
          JSON.parse(result),
        )
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            Logger.error(`Error: ${err}`);
          });
      }
    });
  });
};

exports.calculate = async function (
  itemName,
  region,
  quantity,
  multiply = 1,
  type = ''
) {
  const emissions = await find(itemName, region, quantity);
  // round up the emission value upto 10 decimal points
  if (type && emissions.type != type) {
    return new Promise((resolve, reject) => {
      reject(`Unable to find component ${itemName} for ${region}`);
    });
  }
  for (const i in emissions) {
    emissions[i] = parseFloat((emissions[i] * multiply).toFixed(10));
    // remove CH4 or N2O key if emissions are zero
    if (!emissions[i] && i !== 'CO2') {
      delete emissions[i];
    }
  }
  return emissions;
};
