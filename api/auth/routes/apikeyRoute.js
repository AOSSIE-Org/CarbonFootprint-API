var express = require('express');
var router = express.Router();
// get the auth controller
const Auth = require('../controllers/authController');

router.post('/key', (req, res) => {
    let email = req.user.email;
    let action = "create";
    Auth.auth(email, action);
    res.status(200).json({
        success: true,
        action: req.body.action
    });
});
router.get('/key', (req, res) => {
    let email = req.user.email;
    let action = "retrieve";
    Auth.auth(email, action);
    res.status(200).json({
        success: true,
        action: req.body.action
    });
});
router.delete('/key', (req, res) => {
    let email = req.user.email;
    let action = "revoke";
    Auth.auth(email, action);
    res.status(200).json({
        success: true,
        action: req.body.action
    });
});
module.exports = router;