/* eslint-disable no-await-in-loop */
const spline = require('cubic-spline');
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// eslint-disable-next-line import/no-unresolved
const redis = require('@framework/redis');
const Emission = require('../../models/emissionModel');
// import Redis client
const { redisClient } = redis;

// eslint-disable-next-line consistent-return
const interpolate = (l1, l2, d) => {
  for (let x = 0; x < l1.length; x++) {
    if (d >= l1[x] && d < l1[x + 1] && x < l1.length - 1) {
      return spline(d, l1, l2);
    }
    if (d >= l1[l1.length - 1]) {
      const slope = Math.abs(
        (l2[l2.length - 1] - l2[l2.length - 2]) / (l1[l1.length - 1] - l1[l1.length - 2]),
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
 * A function to calculate the emissions of a component.
 * Refer to the Emission schema for more information on the components.
 */
const find = (component, region, quantity) => {
  const emissions = {
    CO2: 0,
    CH4: 0,
    N2O: 0,
  }; // emissions accumulator
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line prefer-promise-reject-errors
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
                region: 'Default',
              },
            ],
          },
          (err1, item) => {
            // if component is found
            if (!err1 && item) {
              // eslint-disable-next-line no-use-before-define
              processEmission(emissions, component, region, quantity, item)
                .then(result2 => {
                  resolve(result2);
                })
                .catch(err2 => {
                  Logger.error(`Error: ${err2}`);
                });
              redisClient.hset(
                'emissions',
                `${component}[${region}]`,
                JSON.stringify(item.toObject()),
              );
            } else {
              // return an error if component is not found
              // eslint-disable-next-line prefer-promise-reject-errors
              Logger.error(`Unable to find component ${component} for ${region}`);
              reject(new Error(`Unable to find component ${component} for ${region}`));
            }
          },
        );
      } else {
        // eslint-disable-next-line no-use-before-define
        processEmission(emissions, component, region, quantity, JSON.parse(result))
          .then(result2 => {
            resolve(result2);
          })
          .catch(err2 => {
            Logger.error(`Error: ${err2}`);
          });
      }
    });
  });
};

/*
 * A helper function to process the emissions of a component.
 */
const processEmission = (emissions, component, region, quantity, item) => {
  Logger.info(`Item name: ${item.item} :: Region: ${item.region}`);
  return new Promise((resolve, reject) => {
    // if component type is atomic return it's emissions
    if (
      item.components[0].name === 'CO2'
      || item.components[0].name === 'CH4'
      || item.components[0].name === 'N2O'
    ) {
      item.components.forEach(comp => {
        // eslint-disable-next-line no-prototype-builtins
        if (emissions.hasOwnProperty(comp.name)) {
          emissions[comp.name] += quantity * comp.quantity[0];
          Logger.info(`Emissions ${comp.name}: ${emissions[comp.name]} kg`);
        }
      });
      [emissions.type] = item.categories;
      resolve(emissions);
    } else {
      // if component type is complex, recurse to find its atomic components
      const numOfComponents = item.components.length; // number of subcomponents
      // eslint-disable-next-line func-names
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
              .then(emis => {
                // eslint-disable-next-line no-restricted-syntax, guard-for-in
                for (const j in emis) {
                  emissions[j] += emis[j];
                }
              })
              .catch(err => reject(err));
          } else {
            await find(item.components[i].name, region, item.components[i].quantity[0])
              .then(emis => {
                // eslint-disable-next-line no-restricted-syntax, guard-for-in
                for (const j in emis) {
                  emissions[j] += emis[j];
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
            // eslint-disable-next-line guard-for-in, no-restricted-syntax
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

exports.calculate = async (itemName, region, quantity, multiply = 1, type = '') => {
  const emissions = await find(itemName, region, quantity);
  // round up the emission value upto 10 decimal points
  if (type && emissions.type !== type) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`Unable to find component ${itemName} for ${region}`);
    });
  }
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const i in emissions) {
    emissions[i] = parseFloat((emissions[i] * multiply).toFixed(10));
    // remove CH4 or N2O key if emissions are zero
    if (!emissions[i] && i !== 'CO2') {
      delete emissions[i];
    }
  }

  return emissions;
};
