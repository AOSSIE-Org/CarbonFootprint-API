var mongoose = require('mongoose');
var Vehicle = require('../models/vehicleModel');

exports.test = (req, res) => {
	res.send("Working");
}