var express = require('express');
var router = express.Router();

// get the emission controller
var Emission = require('../controllers/emissionController'); 

router.get('/', Emission.find);

module.exports = router;
