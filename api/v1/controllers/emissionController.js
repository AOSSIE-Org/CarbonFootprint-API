/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// eslint-disable-next-line import/no-unresolved
const airports = require('@raw_data/airports.json');
const { calculate } = require('../services/emissionServices');
// get the helper functions
const { getDistanceFromLatLon, distance } = require('./helperFunctions');

exports.emissions = (req, res) => {
  const itemName = req.body.item;
  const region = req.body.region || 'Default';
  const quantity = req.body.quantity || 1;
  const multiply = req.body.multiply || 1;
  calculate(itemName, region, quantity, multiply)
    .then(emissions => {
      Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
      if (emissions.CO2 < 0) {
        res.status(200).json({
          success: true,
          emissions,
          unit: 'kg',
          note: 'A negative number for emissions signifies that the item absorbs CO2.',
        });
      } else {
        res.status(200).json({
          success: true,
          emissions,
          unit: 'kg',
        });
      }
    })
    .catch(err => {
      res.sendJsonError(err, 400);
    });
};

exports.flight = (req, res) => {
  const type = req.body.type || 'international';
  let { model } = req.body;
  const { origin } = req.body;
  const { destination } = req.body;
  const passengers = req.body.passengers || 1;
  if (passengers < 0) {
    return res.status(400).json({ success: false, message: 'Passengers should not be negative' });
  }
  if (airports[origin] && airports[destination]) {
    const orig = airports[origin];
    const dest = airports[destination];
    let dis = getDistanceFromLatLon(orig.lat, orig.lon, dest.lat, dest.lon);
    dis *= 0.539957; // convert distance in km to nautical miles
    if (!model) {
      if (type === 'international') {
        model = 'A380';
      }
      if (type === 'domestic') {
        model = 'A320';
      }
    }
    // else {
    // eslint-disable-next-line max-len
    //   return res.status(400).json({ success: false, message: 'Enter a model number or choose type between domestic/international' };
    // }
    calculate(`airplane model ${model}`, 'Default', dis, passengers)
      .then(emissions => {
        Logger.info(`\nTotal Emissions: ${emissions}`);
        res.status(200).json({
          success: true,
          emissions,
          unit: 'kg',
        });
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        return res.status(404).json({ success: false, message: `Unable to find emissions for airplane model ${model}` });
      });
  } else {
    res.sendJsonError('', 400);
    return res.status(400).json({ success: false, message: 'Unable to find the airports. Please use IATA airport codes only' });
  }
};

exports.trains = (req, res) => {
  const type = req.body.type || 'railcars';
  const { origin } = req.body;
  const { destination } = req.body;
  const passengers = req.body.passengers || 1;
  if (passengers < 0) {
    return res.status(400).json({ success: false, message: 'Passengers should not be negative' });
  }
  if (origin && destination) {
    distance(origin, destination, 'transit')
      .then(val => {
        Logger.debug(`CalculatedDistance: ${val}`);
        Logger.debug(`CalculatedPassengers: ${passengers}`);
        calculate(type, 'Default', val, passengers)
          .then(emissions => {
            Logger.info(`Emissions: ${JSON.stringify(emissions, null, 4)}`);
            res.status(200).json({
              success: true,
              emissions,
              unit: 'kg',
            });
          })
          .catch(err => {
            Logger.error(`Error: ${err}`);
            return res.status(404).json({ success: false, message: `Unable to find emissions for fuel type ${type}` });
          });
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        return res.status(404).json({ success: false, message: `${err}` });
      });
  } else {
    return res.status(400).json({ success: false, message: 'Origin and destination need to be entered' });
  }
};

exports.vehicle = (req, res) => {
  const type = req.body.type || 'Diesel';
  const { origin } = req.body;
  const { destination } = req.body;
  const mileage = parseFloat(req.body.mileage) || 20;
  const passengers = parseFloat(req.body.passengers) || 20;
  if (passengers < 0) {
    return res.status(400).json({ success: false, message: 'Passengers should not be negative' });
  }
  if (origin && destination) {
    distance(origin, destination, 'driving')
      .then(val => {
        Logger.debug(`CalculatedDistance: ${val}`);
        const fuelConsumed = val / mileage;
        Logger.debug(`Fuel consumerd: ${fuelConsumed}`);
        calculate(`fuel${type}`, 'Default', fuelConsumed)
          .then(emissions => {
            Logger.info(`Emissions: ${JSON.stringify(emissions, null, 4)}`);
            res.status(200).json({
              success: true,
              emissions,
              unit: 'kg',
            });
          })
          .catch(err => {
            Logger.error(`Error: ${err}`);
            return res.status(404).json({ success: false, message: `Unable to find emissions for fuel type ${type}` });
          });
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        return res.status(400).json({ success: false, message: err });
      });
  } else {
    return res.status(400).json({ success: false, message: 'Origin and destination need to be entered' });
  }
};

exports.poultry = (req, res) => {
  const { type } = req.body;
  const region = req.body.region || 'Default';
  const quantity = req.body.quantity || 1;
  if (quantity < 0) {
    return res.status(400).json({ success: false, message: 'Quantity should not be negative' });
  }
  if (type) {
    calculate(type, region, quantity, 1)
      .then(emissions => {
        Logger.debug(`Emissions: ${emissions}`);
        res.status(200).json({
          success: true,
          emissions,
          unit: 'kg',
        });
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        return res.status(400).json({ success: false, message: `We cannot provide carbon footprints for this combination of ${type} in ${region} of mass ${quantity} kg` });
      });
  } else {
    return res.status(400).json({ success: false, message: 'Please enter a type of meat' });
  }
};

exports.appliances = (req, res) => {
  const { appliance } = req.body;
  const quantity = req.body.quantity || 1;
  const runningTime = req.body.running_time || 1;
  const region = req.body.region || 'Default';
  if (runningTime < 0 || quantity < 0) {
    return res.status(400).json({ success: false, message: 'Quantity and running time should not be negative' });
  }
  calculate(`${appliance}`, region, quantity, runningTime)
    .then(emissions => {
      Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
      res.status(200).json({
        success: true,
        emissions,
        unit: 'kg',
      });
    })
    .catch(err => {
      Logger.error(`Error: ${err}`);
      return res.status(400).json({ success: false, message: `${err}` });
    });
};

exports.quantity = (req, res) => {
  const itemName = req.body.item;
  const region = req.body.region || 'Default';
  const emission = req.body.emission || 1;
  calculate(itemName, region, 1, 1)
    .then(emissions => {
      Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
      if (emissions.CO2) {
        const quantity = Math.abs(emission / emissions.CO2);
        res.status(200).json({
          success: true,
          quantity,
          note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`,
        });
      } else {
        res.sendJsonError(`Unable to find quantity for item type ${itemName}`, 400);
      }
    })
    .catch(err => {
      Logger.error(`Error: ${err}`);
      res.sendJsonError(`Unable to find quantity for item type ${itemName}`, 400);
    });
};

exports.agriculture = (req, res) => {
  const itemName = req.body.item;
  const { region } = req.body;
  if (itemName && region) {
    calculate(itemName, region, 1, 1, 'agriculture')
      .then(emissions => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        if (emissions.CO2) {
          res.status(200).json({
            success: true,
            quantity: emissions.CO2,
            unit: 'gigagrams',
            note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`,
          });
        } else {
          res.sendJsonError(`Unable to find emissions for sector ${itemName} in ${region}`, 400);
        }
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(
          `Unable to find agriculture emissions for item type ${itemName} in ${region}`,
          400,
        );
      });
  } else res.sendJsonError('Please provide valid item and region values', 400);
};

exports.food = (req, res) => {
  const itemName = req.body.item;
  const { region } = req.body;
  if (itemName && region) {
    calculate(itemName, region, 1, 1, 'food')
      .then(emissions => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        if (emissions.CO2) {
          res.status(200).json({
            success: true,
            quantity: emissions.CO2,
            unit: 'gigagrams',
            note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`,
          });
        } else {
          res.sendJsonError(`Unable to find emissions for sector ${itemName} in ${region}`, 400);
        }
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(
          `Unable to find food emissions for item type ${itemName} in ${region}`,
          400,
        );
      });
  } else res.sendJsonError('Please provide valid item and region values', 400);
};

exports.land = (req, res) => {
  const itemName = req.body.item;
  const { region } = req.body;
  if (itemName && region) {
    calculate(itemName, region, 1, 1, 'land')
      .then(emissions => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        if (emissions.CO2) {
          res.status(200).json({
            success: true,
            quantity: emissions.CO2,
            unit: 'gigagrams',
            note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`,
          });
        } else {
          res.sendJsonError(`Unable to find emissions for sector ${itemName} in ${region}`, 400);
        }
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(
          `Unable to find land emissions for item type ${itemName} in ${region}`,
          400,
        );
      });
  } else res.sendJsonError('Please provide valid item and region values', 400);
};

exports.sector = (req, res) => {
  const { sector } = req.body;
  const { region } = req.body;
  if (sector && region) {
    calculate(sector, region, 1, 1, 'sector')
      .then(emissions => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        if (emissions.CO2) {
          res.status(200).json({
            success: true,
            quantity: emissions.CO2,
            unit: 'gigagrams',
            note: `This is a estimate for the quantity of ${sector} that could be the cause of the emission provided.`,
          });
        } else {
          res.sendJsonError(`Unable to find emissions for sector ${sector} in ${region}`, 400);
        }
      })
      .catch(err => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(`Unable to find emissions for ${sector} in ${region}`, 400);
      });
  } else {
    res.sendJsonError('Please provide valid sector and region values', 400);
  }
};
