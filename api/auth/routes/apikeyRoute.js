var express = require('express');
var router = express.Router();
// get the auth controller
const Auth = require('../controllers/authController');

router.post('/key', (req, res) => {
  console.log(req.user);
    let email_verified = req.user.email_verified;
    let email = req.user.email;
    let action = "create";
    if (email_verified) {
        let create = Auth.auth(email, action)
        create.then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: true,
                    apikey: result.apikey,
                    requests: result.requests
                });
            })
            .catch(function (reject) {
                res.status(400).json({
                    success: false,
                    err: reject
                });
            });
    }
    else {
        res.status(403).json({
                    success: false,
                    err: "Email not verified"
                });
    }
});

router.get('/key', (req, res) => {
    let email = req.user.email;
    let action = "retrieve";
    let retrieve = Auth.auth(email, action)
    retrieve.then(function (result) {
            console.log(result);
            res.status(200).json({
                success: true,
                apikey: result.apikey,
                requests: result.requests
            });
        })
        .catch(function (reject) {
            res.status(404).json({
                success: false,
                err: reject
            });
        });
});

router.delete('/key', (req, res) => {
    let email = req.user.email;
    let action = "revoke";
    Auth.auth(email, action).then(function (result) {
            res.status(200).json({
                success: true,
                deleted: req.user.email
            });
        })
        .catch(function (reject) {
            res.status(404).json({
                success: false,
                err: "User not found"
            });
        });
});

module.exports = router;
