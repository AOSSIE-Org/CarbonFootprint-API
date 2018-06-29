const express = require('express');
// get the auth controller
const { auth } = require('../controllers/authController');
// get the logger
const Logger  = require('../../../framework/Logger');

const router = express.Router();

/**
 * Route Responsible for API key creation
 * and verification
 * @type POST
 */
router.post('/key', (req, res) => {
    Logger.debug(req.user);
    let email_verified = req.user.email_verified;
    let email = req.user.email;
    let action = "create";
    if (email_verified) {
        let create = auth(email, action);
        create.then(result => {
                Logger.debug(result);
                res.status(200).json({
                    success: true,
                    apikey: result.apikey,
                    requests: result.requests
                });
            })
            .catch(reject => {
                res.status(400).json({
                    success: false,
                    err: reject
                });
            });
    }
    else res.sendJsonError("Email not verified", 403);
});

/**
 * Route responsible for API key retrieval
 * @type GET
 */
router.get('/key', (req, res) => {
    let email = req.user.email;
    let action = "retrieve";
    let retrieve = auth(email, action);
    retrieve.then(result => {
            Logger.debug(result);
            res.status(200).json({
                success: true,
                apikey: result.apikey,
                requests: result.requests
            });
        })
        .catch(reject => {
            res.returnNotFoundError('User');
        });
});

/**
 * Route responsible for deletion of API key
 * @type DELETE
 */
router.delete('/key', (req, res) => {
    let email = req.user.email;
    let action = "revoke";
    auth(email, action).then(result => {
            res.status(200).json({
                success: true,
                deleted: req.user.email
            });
        })
        .catch(reject => {
            res.returnNotFoundError('User');
        });
});

module.exports = router;
