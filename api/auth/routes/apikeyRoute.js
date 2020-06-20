const express = require('express');

const router = express.Router();
const authControllers = require('../controllers/authController');

/**
 * Route Responsible for API key creation
 * and verification
 * @type POST
 */
router.route('/key').post(authControllers.createKey);

/**
 * Route responsible for API key retrieval
 * @type GET
 */
router.route('/key').get(authControllers.getKey);

/**
 * Route responsible for deletion of API key
 * @type DELETE
 */
router.route('/key').delete(authControllers.deleteKey);

module.exports = router;
