/* eslint-disable max-len */
// eslint-disable-next-line import/no-unresolved
// const redis = require('@framework/redis');
const axios = require('axios');
const GoogleFit = require('../../models/googleFitModel');

// const { redisClient } = redis;
const reqbody = {
  startTimeMillis: new Date().setHours(0, 0, 0, 0) - 86400000 * 7,
  endTimeMillis: new Date().setHours(0, 0, 0, 0),
  bucketByTime: { durationMillis: 86400000 },
  aggregateBy: [
    {
      dataTypeName: 'com.google.step_count.delta',
      dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
    },
    {
      dataTypeName: 'com.google.distance.delta',
      dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:pruned_distance',
    },
  ],
};

exports.getApiToken = () => new Promise((resolve, reject) => {
  axios.post(process.env.AUTH0_TOKEN_ENDPOINT, {
    client_id: process.env.AUTH0_CLIENT_ID, client_secret: process.env.AUTH0_CLIENT_SECRET, audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`, grant_type: 'client_credentials',
  }, {
    headers: { 'content-type': 'application/json' },
  }).then(managementAccessToken => {
    resolve(managementAccessToken.data.access_token);
  }).catch(error => {
    reject(error);
  });
});

exports.getAccessToken = (userId, apiToken) => new Promise((resolve, reject) => {
  axios.get(`${process.env.AUTH0_API_ENDPOINT}${userId}`, {
    headers: { authorization: `Bearer ${apiToken}` },
  }).then(fullUserProfile => {
    resolve(fullUserProfile.data.identities[0].access_token);
  }).catch(error => {
    reject(error);
  });
});

exports.getFitData = (accessToken) => new Promise((resolve, reject) => {
  axios.post(process.env.GOOGLE_FIT_API_ENDPOINT, reqbody, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(result => {
    const fitData = result.data.bucket.map(day => {
      const date = new Date(parseInt(day.startTimeMillis, 10));
      date.toDateString();
      const steps = (day.dataset[0].point.length === 0) ? 0 : day.dataset[0].point[0].value[0].intVal;
      const distance = (day.dataset[1].point.length === 0) ? 0 : day.dataset[1].point[0].value[0].fpVal;
      return { date, steps, distance };
    });
    resolve(fitData);
  }).catch(error => {
    reject(error);
  });
});

exports.fillDb = (userId, fitData) => new Promise((resolve, reject) => {
  const documents = fitData.map(item => {
    const obj = new GoogleFit({
      userId,
      distance: item.distance,
      steps: item.steps,
      date: item.date,
    });
    return obj;
  });
  GoogleFit.insertMany(documents, { ordered: false })
    .then(result => {
      resolve(result);
    })
    .catch(err => {
      if (err.name === 'BulkWriteError' && err.code === 11000) {
        resolve('successfully updated database');
      } else reject(err);
    });
});

exports.fetchFromDb = (userId) => new Promise((resolve, reject) => {
  GoogleFit.find({ userId })
    .sort({ date: -1 })
    .limit(20)
    .then(fitdata => resolve(fitdata))
    .catch(err => reject(err));
});
