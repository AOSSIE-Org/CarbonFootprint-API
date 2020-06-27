const express = require('express');

const router = express.Router();
const googleFitControllers = require('../controllers/googleFitController');

router.route('/fit').post(googleFitControllers.fitData);

module.exports = router;
