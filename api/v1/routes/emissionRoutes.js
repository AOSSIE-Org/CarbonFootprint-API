var express = require('express');
var router = express.Router();
// get the emission controller
const Emission = require('../controllers/emissionController');
// get the helper functions
const Helper = require('../controllers/helperFunctions');

router.post('/emissions', (req, res) => {
	let itemName = req.body["item"];
	let region = req.body["region"] || "Default";
	let quantity = req.body["quantity"] || 1;
	let multiply = req.body["multiply"] || 1;
	Emission.calculate(itemName, region, quantity, multiply)
		.then((emissions) => {
			// console.log(`\nTotal Emissions: ${emissions.CO2}`);
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
			console.log(`Error: ${err}`);
			res.status(400).json({
				success: false,
				err: err
			});
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
		let distance = Helper.getDistanceFromLatLon(orig.lat, orig.lon, dest.lat, dest.lon);
		distance *= 0.539957; // convert distance in km to nautical miles
		if (!model) {
			if (type == 'international') {
				model = 'A380';
			}
			if (type == 'domestic') {
				model = 'A320';
			}
		}

		Emission.calculate(`airplane model ${model}`, 'Default', distance)
			.then((emissions) => {
				console.log(`\nTotal Emissions: ${emissions}`);
				res.status(200).json({
					success: true,
					emissions: emissions,
					unit: 'kg'
				});
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
				res.status(404).json({
					success: false,
					err: `Unable to find emissions for airplane model ${model}`
				});
			});
	} else {
		res.status(400).json({
			success: false,
			error: 'Unable to find the airports. Please use ICAO airport codes only'
		});
	}

});

router.post('/vehicle', async(req, res) => {
	let type = req.body.type || 'Diesel';
	let origin = req.body.origin;
	let destination = req.body.destination;
	let unit = req.body.unit || 'km';
	let mileage = parseFloat(req.body.mileage) || 20;
	let mileage_unit = req.body.mileage_unit || 'km/l';

	if (origin && destination) {
		let distance = Helper.distance(origin, destination, 'driving');
		distance
			.then((val) => {
				console.log("CalculatedDistance= " + val);
				let fuelConsumed = val / mileage;
				console.log(fuelConsumed);
				Emission.calculate(`fuel${type}`, 'Default', fuelConsumed)
					.then((emissions) => {
						console.log(`Emissions: ${JSON.stringify(emissions, null ,4)}`);
						res.status(200).json({
							success: true,
							emissions: emissions,
							unit: 'kg'
						});
					})
					.catch((err) => {
						console.log(`Error: ${err}`);
						res.status(404).json({
							success: false,
							err: `Unable to find emissions for fuel type ${type}`
						});
					});
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
				res.status(400).json({
					success: false,
					err: err
				});
			});

	} else {
		res.status(400).json({
			success: false,
			error: 'Distance or Mileage cannot be less than zero'
		});
	}
});

router.post('/trains', async(req, res) => {
	let type = req.body.type || 'railcars';
	let region = req.body.region || 'Default';
	let origin = req.body.origin;
	let destination = req.body.destination;
	let passengers = req.body.passengers || 1;

	if (origin && destination) {
		let distance = Helper.distance(origin, destination, 'transit');
		distance
			.then((val) => {
				console.log("CalculatedDistance= " + val);
				console.log("CalculatedPassengers= " + passengers);
				Emission.calculate(type, 'Default', val, passengers)
					.then((emissions) => {
						console.log(`Emissions: ${JSON.stringify(emissions, null ,4)}`);
						res.status(200).json({
							success: true,
							emissions: emissions,
							unit: 'kg'
						});
					})
					.catch((err) => {
						console.log(`Error: ${err}`);
						res.status(404).json({
							success: false,
							err: `Unable to find emissions for fuel type ${type}`
						});
					});
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
				res.status(400).json({
					success: false,
					err: err
				});
			});

	} else {
		res.status(400).json({
			success: false,
			error: 'Distance cannot be less than zero'
		});
	}
});

router.post('/poultry', async(req, res) => {
	let type = req.body.type;
	let region = req.body.region || 'Default';
	let quantity = req.body.quantity || 1;
	//console.log(`${type} in ${region} of mass ${quantity} kg`);
	if (type) {
		Emission.calculate(type, region, quantity)
			.then((emissions) => {
				console.log(emissions);
				res.status(200).json({
					success: true,
					emissions: emissions,
					unit: 'kg'
				});
			}).catch((err) => {
				res.status(400).json({
					success: false,
					err: `We cannot provide carbon footprints for this combination of ${type} in ${region} of mass ${quantity} kg`
				})
			});
	} else {
		res.status(400).json({
			success: false,
			error: `Unable to find carbon footprint for type ${type}`
		});
	}
});

router.post('/appliances', (req, res) => {
	let appliance = req.body["appliance"];
	let type = req.body["type"];
	let region = req.body["region"] || "Default";
	let unit = req.body["unit"] || "kWh";
	let quantity = req.body["quantity"] || 1;
	let runnning_time = req.body["runnning_time"] || 1;
	Emission.calculate(`${appliance} ${type}`, region, quantity, runnning_time)
		.then((emissions) => {
			// console.log(`\nTotal Emissions: ${emissions.CO2}`);
			res.status(200).json({
				success: true,
				emissions: emissions,
				unit: 'kg'
			});
		})
		.catch((err) => {
			console.log(`Error: ${err}`);
			res.status(400).json({
				success: false,
				err: err
			});
		});
});

module.exports = router;

//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kWh","quantity":1}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"airplane model A380","region":"Default","unit":"nm","quantity":125}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"Petrol","distance":100,"unit":"km","mileage":50,"mileage_unit":"km/L"}' http://localhost:3080/v1/vehicle
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"international","model":"A380","origin":"DEL","destination":"IXG"}' http://localhost:3080/v1/flight