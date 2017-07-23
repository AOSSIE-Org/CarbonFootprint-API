var express = require('express');
var router = express.Router();
// get the auth controller
const Auth = require('../controllers/authController');

router.post('/key', (req, res) => {
    let email = req.user.email;
    let action = "create";
    let create = Auth.auth(email,action)
    create.then(function (result) {
            console.log(result);
            res.status(200).json({
                success: true,
                create: result
            });
        })
        .catch(function (reject) {
            res.status(200).json({
                success: true,
                err: reject
            });
        });
});

router.get('/key', (req, res) => {
    let email = req.user.email;
    let action = "retrieve";
    let retrieve = Auth.auth(email, action)
    retrieve.then(function (result) {
            console.log(result);
            res.status(200).json({
                success: true,
                apikey: result
            });
        })
        .catch(function (reject) {
            res.status(200).json({
                success: true,
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
            res.status(200).json({
                success: true,
                err: "User not found"
            });
        });
});

module.exports = router;