const express = require('express');
const router = express.Router();
// get the emission controller
const { calculate } = require('../controllers/emissionController');
// get the helper functions
const { getDistanceFromLatLon, distance } = require('../controllers/helperFunctions');
// get the logger
const Logger = require('@framework/Logger');

router.post('/emissions', (req, res) => {
  const itemName = req.body["item"];
  const region = req.body["region"] || "Default";
  const quantity = req.body["quantity"] || 1;
  const multiply = req.body["multiply"] || 1;
  calculate(itemName, region, quantity, multiply)
      .then((emissions) => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        if (emissions.CO2 < 0) {
          res.status(200).json({
            success: true,
            emissions: emissions,
            unit: 'kg',
            note: "A negative number for emissions signifies that the item absorbs CO2."
          });
        } else {
          res.status(200).json({
            success: true,
            emissions: emissions,
            unit: 'kg'
          });
        }

      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(err, 400);
      });
});

router.post('/flight', (req, res) => {
  const airports = require('@raw_data/airports.json');
  const type = req.body.type || 'international';
  let model = req.body.model;
  const origin = req.body.origin;
  const destination = req.body.destination;
  const passengers = req.body.passengers || 1;
  const seatType = req.body.seatType || 'economy';

  if (airports[origin] && airports[destination]) {
    const orig = airports[origin];
    const dest = airports[destination];
    let distance = getDistanceFromLatLon(orig.lat, orig.lon, dest.lat, dest.lon);
    distance *= 0.539957; // convert distance in km to nautical miles
    if (!model) {
      if (type == 'international') {
        model = 'A380';
      }
      if (type == 'domestic') {
        model = 'A320';
      }
    }

    calculate(`airplane model ${model}`, 'Default', distance, passengers)
        .then((emissions) => {
          Logger.info(`\nTotal Emissions: ${emissions}`);
          res.status(200).json({
            success: true,
            emissions: emissions,
            unit: 'kg'
          });
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(`Unable to find emissions for airplane model ${model}`, 404);
        });
  } else res.sendJsonError('Unable to find the airports. Please use IATA airport codes only', 400);
});

router.post('/vehicle', async(req, res) => {
  const type = req.body.type || 'Diesel';
  const origin = req.body.origin;
  const destination = req.body.destination;
  const unit = req.body.unit || 'km';
  const mileage = parseFloat(req.body.mileage) || 20;
  const mileage_unit = req.body.mileage_unit || 'km/l';

  if (origin && destination) {
    distance(origin, destination, 'driving')
        .then((val) => {
          Logger.debug(`CalculatedDistance: ${val}`);
          const fuelConsumed = val / mileage;
          Logger.debug(`Fuel consumerd: ${fuelConsumed}`);
          calculate(`fuel${type}`, 'Default', fuelConsumed)
              .then((emissions) => {
                Logger.info(`Emissions: ${JSON.stringify(emissions, null, 4)}`);
                res.status(200).json({
                  success: true,
                  emissions: emissions,
                  unit: 'kg'
                });
              })
              .catch((err) => {
                Logger.error(`Error: ${err}`);
                res.sendJsonError(`Unable to find emissions for fuel type ${type}`, 404);
              });
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(err, 400);
        });
  } else res.sendJsonError('Distance or Mileage cannot be less than zero', 400);
});

router.post('/trains', async(req, res) => {
  const type = req.body.type || 'railcars';
  const region = req.body.region || 'Default';
  const origin = req.body.origin;
  const destination = req.body.destination;
  const passengers = req.body.passengers || 1;

  if (origin && destination) {
    distance(origin, destination, 'transit')
        .then((val) => {
          Logger.debug(`CalculatedDistance: ${val}`);
          Logger.debug(`CalculatedPassengers: ${passengers}`);
          calculate(type, 'Default', val, passengers)
              .then((emissions) => {
                Logger.info(`Emissions: ${JSON.stringify(emissions, null, 4)}`);
                res.status(200).json({
                  success: true,
                  emissions: emissions,
                  unit: 'kg'
                });
              })
              .catch((err) => {
                Logger.error(`Error: ${err}`);
                res.sendJsonError(`Unable to find emissions for fuel type ${type}`, 404);
              });
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(err, 400);
        });
  } else res.sendJsonError('Distance cannot be less than zero', 400);
});

router.post('/poultry', async(req, res) => {
  const type = req.body.type;
  const region = req.body.region || 'Default';
  const quantity = req.body.quantity || 1;
  if (type) {
    calculate(type, region, quantity)
        .then((emissions) => {
          Logger.debug(`Emissions: ${emissions}`);
          res.status(200).json({
            success: true,
            emissions: emissions,
            unit: 'kg'
          });
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(`We cannot provide carbon footprints for this combination of ${type} in ${region} of mass ${quantity} kg`, 400);
        });
  } else res.sendJsonError(`Unable to find carbon footprint for type ${type}`, 400);
});

router.post('/appliances', (req, res) => {
  const appliance = req.body["appliance"];
  const type = req.body["type"];
  const region = req.body["region"] || "Default";
  const unit = req.body["unit"] || "kWh";
  const quantity = req.body["quantity"] || 1;
  const running_time = req.body["running_time"] || 1;
  calculate(`${appliance} ${type}`, region, quantity, running_time)
      .then((emissions) => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        res.status(200).json({
          success: true,
          emissions: emissions,
          unit: 'kg'
        });
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(err, 400);
      });
});

router.post('/quantity', (req, res) => {
  const itemName = req.body["item"];
  const region = req.body["region"] || "Default";
  const emission = req.body["emission"] || 1;
  calculate(itemName, region, 1, 1)
      .then((emissions) => {
        Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
        if (emissions.CO2) {
          const quantity = Math.abs(emission / emissions.CO2);
          res.status(200).json({
            success: true,
            quantity: quantity,
            note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`
          });
        } else {
          res.sendJsonError(`Unable to find quantity for item type ${itemName}`, 400);
        }
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.sendJsonError(`Unable to find quantity for item type ${itemName}`, 400);
      });
});

router.post('/agriculture', (req, res) => {
  const itemName = req.body.item;
  const region = req.body.region;
  if (itemName && region) {
    calculate(itemName, region, 1, 1, 'agriculture')
        .then((emissions) => {
          Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
          if (emissions.CO2) {
            res.status(200).json({
              success: true,
              quantity: emissions.CO2,
              unit: 'gigagrams',
              note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`
            });
          } else {
            res.sendJsonError(`Unable to find emissions for sector ${itemName} in ${region}`, 400);
          }
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(`Unable to find agriculture emissions for item type ${itemName} in ${region}`, 400);
        });
  } else res.sendJsonError(`Please provide valid item and region values`, 400);
});

router.post('/food', (req, res) => {
  const itemName = req.body.item;
  const region = req.body.region;
  if (itemName && region) {
    calculate(itemName, region, 1, 1, 'food')
        .then((emissions) => {
          Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
          if (emissions.CO2) {
            res.status(200).json({
              success: true,
              quantity: emissions.CO2,
              unit: 'gigagrams',
              note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`
            });
          } else {
            res.sendJsonError(`Unable to find emissions for sector ${itemName} in ${region}`, 400);
          }
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(`Unable to find food emissions for item type ${itemName} in ${region}`, 400);
        });
  } else res.sendJsonError(`Please provide valid item and region values`, 400);
});

router.post('/land', (req, res) => {
  const itemName = req.body.item;
  const region = req.body.region;
  if (itemName && region) {
    calculate(itemName, region, 1, 1, 'land')
        .then((emissions) => {
          Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
          if (emissions.CO2) {
            res.status(200).json({
              success: true,
              quantity: emissions.CO2,
              unit: 'gigagrams',
              note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`
            });
          } else {
            res.sendJsonError(`Unable to find emissions for sector ${itemName} in ${region}`, 400);
          }
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(`Unable to find land emissions for item type ${itemName} in ${region}`, 400);
        });
  } else res.sendJsonError(`Please provide valid item and region values`, 400);
});

router.post('/sector', (req, res) => {
  const sector = req.body.sector;
  const region = req.body.region;
  if (sector && region) {
    calculate(sector, region, 1, 1, 'sector')
        .then((emissions) => {
          Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
          if (emissions.CO2) {
            res.status(200).json({
              success: true,
              quantity: emissions.CO2,
              unit: 'gigagrams',
              note: `This is a estimate for the quantity of ${sector} that could be the cause of the emission provided.`
            });
          } else {
            res.sendJsonError(`Unable to find emissions for sector ${sector} in ${region}`, 400);
          }
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.sendJsonError(`Unable to find emissions for ${sector} in ${region}`, 400);
        });
  } else res.sendJsonError(`Please provide valid sector and region values`, 400);
});

module.exports = router;

//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kWh","quantity":1}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"airplane model A380","region":"Default","unit":"nm","quantity":125}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"Petrol","distance":100,"unit":"km","mileage":50,"mileage_unit":"km/L"}' http://localhost:3080/v1/vehicle
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"international","model":"A380","origin":"DEL","destination":"IXG"}' http://localhost:3080/v1/flight