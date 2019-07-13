const express = require('express');

const {
  createLog,
  getEmissionsOfUser,
} = require('../controllers/dailyEmissionController');

const router = express.Router();

router.get('/daily-emission', (req, res) => {
  const { email } = req.user;
  getEmissionsOfUser(email)
    .then(data => {
      res.send(data);
    })
    .catch(err => res.status(400).send(err));
});

router.post('/daily-emission', (req, res) => {
  const { email } = req.user;
  const { quantity } = req.body;
  let { date } = req.body;
  date = new Date(date);
  createLog(email, quantity, date)
    .then(data => {
      res.send(data);
    })
    .catch(() => res.status(400).send());
});

module.exports = router;
