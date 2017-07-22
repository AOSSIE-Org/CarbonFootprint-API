var express = require('express');
var router = express.Router();
// get the auth controller
const Auth = require('../controllers/emissionController');
router.post('/', (req, res) => {
    res.status(200).json({
                success: true,
                action: req.body.action
            });
});

module.exports = router;