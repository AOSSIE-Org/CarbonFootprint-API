const express = require('express');

const router = express.Router();
const googleFitControllers = require('../controllers/googleFitController');

// to obtain fit data when user logins via google-auth0
router.route('/fit/direct').post(googleFitControllers.fitDataDirect);

// to obtain fit data if user does not login through google
router.route('/fit/indirect').post(googleFitControllers.fitDataInDirect);

module.exports = router;
