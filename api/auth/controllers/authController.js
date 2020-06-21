// get the auth service
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
const { auth } = require('../services/authServices');

exports.createKey = (req, res) => {
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
        Logger.error(`Error in creating key : ${reject}`);
      });
  } else res.sendJsonError('Email not verified', 403);
};

exports.getKey = (req, res) => {
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
};

exports.deleteKey = (req, res) => {
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
};
