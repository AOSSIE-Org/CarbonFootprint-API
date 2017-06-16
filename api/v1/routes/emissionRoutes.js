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
	Emission.calculate(itemName, region, quantity)
		.then((sum) => {
            console.log(`\nTotal Emissions: ${sum}`);
            res.status(200).json({
                success: true,
                emissions: parseFloat(sum.toFixed(10))
            });
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
            res.json({
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

	if(airports[origin] && airports[destination]){
		let orig = airports[origin];
		let dest = airports[destination];
		let distance = Helper.getDistanceFromLatLon(orig.lat, orig.lon, dest.lat, dest.lon);
		distance *= 0.539957; // convert distance in km to nautical miles
		if(!model){
		  	if(type == 'international') {
		  		model = 'A380';
	          }
	        if(type == 'domestic'){
	        	model = 'A320';
	        }
	    }

		Emission.calculate(`airplane model ${model}`, 'Default', distance)
	        .then((sum) => {
	            console.log(`\nTotal Emissions: ${sum}`);
	            res.status(200).json({
	                success: true,
	                emissions: parseFloat(sum.toFixed(10))
	            });
	        })
	        .catch((err) => {
	            console.log(`Error: ${err}`);
	            res.json({
	                success: false,
	                err: `Unable to find emissions for airplane model ${model}`
	            });
	        });
	}
	else {
		res.status(400).json({
            success: false,
            error: 'Unable to find the airports. Please use ICAO airport codes only'
        });
	}

});

router.post('/vehicle', (req, res) => {
	let type = req.body.type || 'Diesel';
	let distance = req.body.distance;
	let unit = req.body.unit || 'km';
	let mileage = parseFloat(req.body.mileage) || 20;
	let mileage_unit = req.body.mileage_unit || 'km/L';

	if (distance){
		let fuelConsumed = distance/mileage;
		Emission.calculate(`fuel${type}`, 'Default', fuelConsumed)
	        .then((sum) => {
	            console.log(`\nCO2 Emissions: ${sum}`);
	            res.status(200).json({
	                success: true,
	                emissions: {						
						"CO2": parseFloat(sum.toFixed(10)),
						"unit": "kg"
					}

	            });
	        })
	        .catch((err) => {
	            console.log(`Error: ${err}`);
	            res.json({
	                success: false,
	                err: `Unable to find emissions for fuel type ${type}`
	            });
	        });
	}
	else {
		res.status(400).json({
            success: false,
            error: 'Distance or Mileage cannot be less than zero'
        });
	}
});

module.exports = router;
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kWh","quantity":1}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"airplane model A380","region":"Default","unit":"nm","quantity":125}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"Petrol","distance":100,"unit":"km","mileage":50,"mileage_unit":"km/L"}' http://localhost:3080/v1/vehicle
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"type":"international","model":"A380","origin":"DEL","destination":"IXG"}' http://localhost:3080/v1/flight
