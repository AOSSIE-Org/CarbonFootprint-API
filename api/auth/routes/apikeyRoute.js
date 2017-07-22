var express = require('express');
var router = express.Router();
// get the auth controller
const Auth = require('../controllers/authController');

router.post('/', (req, res) => {
    let email = req.user.email;
    let action = req.body.action;
    Auth.auth(email,action);
    res.status(200).json({
                success: true,
                action: req.body.action
            });
});

module.exports = router;