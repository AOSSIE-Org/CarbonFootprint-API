const express = require('express');
const router = express.Router();
// get the emission controller
const { calculate } = require('../controllers/emissionController');
// get the helper functions
const { getDistanceFromLatLon, distance } = require('../controllers/helperFunctions');
// get the logger
const Logger  = require('../../../framework/Logger');

router.post('/emissions', (req, res) => {
	let itemName = req.body["item"];
	let region = req.body["region"] || "Default";
	let quantity = req.body["quantity"] || 1;
	let multiply = req.body["multiply"] || 1;
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
	let airports = require('../../../raw_data/airports.json');
	let type = req.body.type || 'international';
	let model = req.body.model;
	let origin = req.body.origin;
	let destination = req.body.destination;
	let passengers = req.body.passengers || 1;
	let seatType = req.body.seatType || 'economy';

	if (airports[origin] && airports[destination]) {
		let orig = airports[origin];
		let dest = airports[destination];
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
	let type = req.body.type || 'Diesel';
	let origin = req.body.origin;
	let destination = req.body.destination;
	let unit = req.body.unit || 'km';
	let mileage = parseFloat(req.body.mileage) || 20;
	let mileage_unit = req.body.mileage_unit || 'km/l';

	if (origin && destination) {
        distance(origin, destination, 'driving')
			.then((val) => {
				Logger.debug("CalculatedDistance= " + val);
				let fuelConsumed = val / mileage;
			  	Logger.debug(fuelConsumed);
				calculate(`fuel${type}`, 'Default', fuelConsumed)
					.then((emissions) => {
                      	Logger.info(`Emissions: ${JSON.stringify(emissions, null ,4)}`);
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
	let type = req.body.type || 'railcars';
	let region = req.body.region || 'Default';
	let origin = req.body.origin;
	let destination = req.body.destination;
	let passengers = req.body.passengers || 1;

	if (origin && destination) {
        distance(origin, destination, 'transit')
			.then((val) => {
              	Logger.debug("CalculatedDistance= " + val);
              	Logger.debug("CalculatedPassengers= " + passengers);
				calculate(type, 'Default', val, passengers)
					.then((emissions) => {
                      	Logger.info(`Emissions: ${JSON.stringify(emissions, null ,4)}`);
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
	let type = req.body.type;
	let region = req.body.region || 'Default';
	let quantity = req.body.quantity || 1;
	//console.log(`${type} in ${region} of mass ${quantity} kg`);
	if (type) {
		calculate(type, region, quantity)
			.then((emissions) => {
              	Logger.debug(emissions);
				res.status(200).json({
					success: true,
					emissions: emissions,
					unit: 'kg'
				});
			}).catch((err) => {
				res.sendJsonError(`We cannot provide carbon footprints for this combination of ${type} in ${region} of mass ${quantity} kg`, 400);
			});
	} else res.sendJsonError(`Unable to find carbon footprint for type ${type}`, 400);

});

router.post('/appliances', (req, res) => {
	let appliance = req.body["appliance"];
	let type = req.body["type"];
	let region = req.body["region"] || "Default";
	let unit = req.body["unit"] || "kWh";
	let quantity = req.body["quantity"] || 1;
	let running_time = req.body["running_time"] || 1;
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
	let itemName = req.body["item"];
	let region = req.body["region"] || "Default";
	let emission = req.body["emission"] || 1;
	calculate(itemName, region, 1, 1)
		.then((emissions) => {
          	Logger.info(`\nTotal Emissions: ${emissions.CO2}`);
			if(emissions.CO2){
				let quantity = Math.abs(emission/emissions.CO2);
				res.status(200).json({
					success: true,
					quantity: quantity,
					note: `This is a estimate for the quantity of ${itemName} that could be the cause of the emission provided.`
				});
			}
		})
		.catch((err) => {
          	Logger.error(`Error: ${err}`);
            res.sendJsonError(`Unable to find quantity for item type ${itemName}`, 400);
        });
});

module.exports = router;

//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kWh","quantity":1}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"airplane model A380","region":"Default","unit":"nm","quantity":125}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"Petrol","distance":100,"unit":"km","mileage":50,"mileage_unit":"km/L"}' http://localhost:3080/v1/vehicle
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"international","model":"A380","origin":"DEL","destination":"IXG"}' http://localhost:3080/v1/flight