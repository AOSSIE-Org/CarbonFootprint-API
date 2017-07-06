var express = require('express');
var router = express.Router();

const path = process.cwd();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(`${path}/client/public/index.html`);
});

module.exports = router;

