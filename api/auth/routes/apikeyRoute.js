const express = require('express');
// get the auth controller
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
const { auth } = require('../controllers/authController');
// get the logger

const router = express.Router();

/**
 * Route Responsible for API key creation
 * and verification
 * @type POST
 */
router.post('/key', (req, res) => {
  Logger.debug(`User: ${JSON.stringify(req.user)}`);
  const { email_verified: emailVerified } = req.user;
  const { email } = req.user;
  const action = 'create';
  if (emailVerified) {
    const create = auth(email, action);
    create
      .then(result => {
        Logger.debug(`Create key result: ${result}`);
        res.status(200).json({
          success: true,
          apikey: result.apikey,
          requests: result.requests,
        });
      })
      .catch(reject => {
        res.status(400).json({
          success: false,
          err: reject,
        });
      });
  } else res.sendJsonError('Email not verified', 403);
});

/**
 * Route responsible for API key retrieval
 * @type GET
 */
router.get('/key', (req, res) => {
  const { email } = req.user;
  const action = 'retrieve';
  const retrieve = auth(email, action);
  retrieve
    .then(result => {
      Logger.debug(`Retrieve key result: ${result}`);
      res.status(200).json({
        success: true,
        apikey: result.apikey,
        requests: result.requests,
      });
    })
    .catch(() => {
      res.returnNotFoundError('User');
    });
});

/**
 * Route responsible for deletion of API key
 * @type DELETE
 */
router.delete('/key', (req, res) => {
  const { email } = req.user;
  const action = 'revoke';
  auth(email, action)
    .then(() => {
      res.status(200).json({
        success: true,
        deleted: req.user.email,
      });
    })
    .catch(() => {
      res.returnNotFoundError('User');
    });
});

module.exports = router;
