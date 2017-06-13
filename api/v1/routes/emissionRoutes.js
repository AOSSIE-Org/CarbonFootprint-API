var express = require('express');
var router = express.Router();
// get the emission controller
var Emission = require('../controllers/emissionController'); 

router.post('/',Emission.find);

module.exports = router;
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kWh","quantity":1}' http://localhost:3080/v1/emissions
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"airplane model A380","region":"Default","unit":"nm","quantity":125}' http://localhost:3080/v1/emissions