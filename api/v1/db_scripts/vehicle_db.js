// eslint-disable-next-line import/no-extraneous-dependencies
require('module-alias/register');

// To run this script use "node vehicle_db.js"
// database setup
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// get the logger
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// get the database configuration file
// eslint-disable-next-line import/no-unresolved
const config = require('@root/config.json');

try {
  if (!config) {
    throw new Error('config.json missing');
  }
} catch (e) {
  Logger.error('Database configuration file "config.json" is missing.');
  process.exit(1);
}
const db = config.database;

// connect to the database
mongoose.connect(
  `mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`,
  {
    useMongoClient: true,
  },
);

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
  Logger.info('vehicle_db.js running');
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});
// eslint-disable-next-line import/no-unresolved
const json = require('@raw_data/fuels.json');
const Emission = require('../models/emissionModel.js');

const emissions = [];
const { data } = json;
for (let js = 0; js < data.length; js++) {
  const obj = new Emission();
  obj.item = data[js].langKey;
  obj.region = 'Default';
  obj.quantity = [1];
  obj.unit = 'L';
  obj.categories = ['vehicle', 'transport'];
  obj.components = [
    {
      name: 'CO2',
      quantity: [data[js].CO2Emission],
      unit: 'kg CO2/L',
    },
    {
      name: 'CH4',
      quantity: [data[js].CH4Emission],
      unit: 'kg CH4/L',
    },
    {
      name: 'N2O',
      quantity: [data[js].N2OEmission],
      unit: 'kg N2O/L',
    },
    {
      name: 'GHG',
      quantity: [data[js].GHGEmission],
      unit: 'kg GHG/L',
    },
  ];
  emissions.push(obj);
}

Emission.create(emissions, err => {
  if (err) throw err;
  mongoose.connection.close();
});
