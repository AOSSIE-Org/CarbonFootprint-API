const { Logger } = require('winston');
const {
  createLog,
  getEmissionsOfUser,
} = require('../services/dailyEmissionServices');

exports.getDailyEmissions = (req, res) => {
  const { email } = req.user;
  getEmissionsOfUser(email)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send(err);
      Logger.error(`Cannot fetch daily emissions : ${err}`);
    });
};

exports.addDailyEmissions = (req, res) => {
  const { email } = req.user;
  const { quantity } = req.body;
  let { date } = req.body;
  date = new Date(date);
  createLog(email, quantity, date)
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(400).send();
      Logger.error('Cannot add data to daily emissions');
    });
};
