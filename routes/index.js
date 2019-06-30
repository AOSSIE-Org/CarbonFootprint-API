const express = require('express');

const router = express.Router();

const path = process.cwd();

/* GET home page. */
router.get('*', (req, res) => {
  res.sendFile(`${path}/client/build/index.html`);
});

module.exports = router;
