var express = require('express');
var router = express.Router();
// get the emission controller
var Emission = require('../controllers/emissionController'); 

router.post('/',Emission.find)
// router.get('/', Emission.find);

module.exports = router;
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kg/kWh","quantity":1}' http://localhost:3080/v1/emissions