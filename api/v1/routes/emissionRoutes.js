var express = require('express');
var router = express.Router();
// get the emission controller
var Emission = require('../controllers/emissionController'); 

router.post('/',function (req, res) {
    // console.log(req.body);      // your JSON
    // res.send(req.body);    // echo the result back
    res.status(200).send(req.body);
})
// router.get('/', Emission.find);

module.exports = router;
//curl test- curl -H "Content-Type: application/json" -X POST -d '{"item":"electricity","region":"Africa","unit":"kg/kWh","quantity":1}' http://localhost:3080/v1/emissions