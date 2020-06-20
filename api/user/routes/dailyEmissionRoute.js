const express = require('express');

const controllers = require('../controllers/dailyEmissionController');

const router = express.Router();

router.route('/daily-emission').get(controllers.getDailyEmissions);

router.route('/daily-emission').post(controllers.addDailyEmissions);

module.exports = router;
