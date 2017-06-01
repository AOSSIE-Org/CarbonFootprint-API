var express = require('express');
var router = express.Router();

// get the vehicle controller
var vehicle = require('../controllers/vehicleController'); 

router.get('/', vehicle.test);
router.get('/:modelnumber', vehicle.test);

module.exports = router;
