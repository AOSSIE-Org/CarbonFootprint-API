const redis = require('@framework/redis');
const DailyEmission = require('../models/DailyEmission');
const User = require('../../auth/models/userModel');

const { redisClient } = redis;

const createLog = async (email, quantity, date) => {
  date.setHours(0, 0, 0, 0);
  return DailyEmission.findOneAndUpdate(
    {
      email,
      date: date.toJSON(),
    },
    {
      $set: {
        quantity,
      },
    },
    {
      new: true,
    },
  ).then((data) => {
    if (data === null) {
      console.log("This log doesn't exist. Creating new log");
      const todaysEmission = new DailyEmission({
        email,
        quantity,
        date: date.toJSON(),
      });
      return todaysEmission
        .save()
        .then(data => data)
        .catch(err => console.log(JSON.stringify(err, null, 4)));
    }
    return data;
  });
};

const getEmissionsOfUser = email => new Promise(async (resolve, reject) => {
  // redisClient.hget("dailyEmission", email, async (err, result) => {
  //   result = JSON.parse(result);
  //   const currDate = new Date();
  //   const issueDate = new Date(result.issueDate);
  //   const latestUpdateDate = new Date(result.userEmission[0].date);
  //   console.log(
  //     (issueDate.toDateString() !== currDate.toDateString()) +
  //       " " +
  //       (issueDate.getHours() !== latestUpdateDate.getHours())
  //   );
  //   console.log(currDate, issueDate, latestUpdateDate);
  //   if (
  //     err ||
  //     !result ||
  //     issueDate.toDateString() !== currDate.toDateString() ||
  //     issueDate.getHours() !== latestUpdateDate.getHours() ||
  //     issueDate.getMinutes() !== latestUpdateDate.getMinutes() ||
  //     issueDate.getSeconds() !== latestUpdateDate.getSeconds()
  //   ) {
  // NOTE : work for cache by first uncommenting above code
  const userEmission = await DailyEmission.find({ email })
    .sort({ date: -1 })
    .limit(20);
  redisClient.hset(
    'dailyEmission',
    email,
    JSON.stringify({ userEmission, issueDate: new Date().toJSON() }),
    (err) => {
      if (err) {
        console.log('error while creating key');
        reject(err);
      }
    },
  );
  // console.log("Data fetched from DB");
  resolve(userEmission);
  // return;
  //   }
  //   console.log("Data fetched from cache");
  //   resolve(result.userEmission);
  // });
});

module.exports = {
  createLog,
  getEmissionsOfUser,
};
