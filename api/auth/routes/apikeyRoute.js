const express = require('express');
// get the auth controller
const { auth } = require('../controllers/authController');

const router = express.Router();

router.post('/key', (req, res) => {
  console.log(req.user);
    let email_verified = req.user.email_verified;
    let email = req.user.email;
    let action = "create";
    if (email_verified) {
        let create = auth(email, action)
        create.then(result => {
                console.log(result);
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

router.get('/key', (req, res) => {
    let email = req.user.email;
    let action = "retrieve";
    let retrieve = auth(email, action)
    retrieve.then(result => {
            console.log(result);
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
