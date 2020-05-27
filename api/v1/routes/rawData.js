/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// eslint-disable-next-line import/no-unresolved
const { fetchRawData } = require('../controllers/rawDataController');

router.get('/rawdata', (req, res) => {
  fetchRawData().then(data => {
    // Logger.info('data', data);
    Logger.info('data successfully fetched');
    res.status(200).json({
      success: true,
      item: data,
    });
  }).catch(err => {
    Logger.error(`Error: ${err}`);
    res.status(400).json(
      'Unable to fetch data',
    );
  });
});

module.exports = router;
