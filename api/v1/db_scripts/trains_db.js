// eslint-disable-next-line import/no-extraneous-dependencies
require('module-alias/register');

// run node trains_db.js to add data to db.
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
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`, {
  useMongoClient: true,
});

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
  Logger.info('trains_db.js running');
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
const trainsData = require('@raw_data/trains.json');
const Emission = require('../models/emissionModel.js');

const emissions = [];
for (let items = 0; items < trainsData.length; items++) {
  const obj = new Emission();
  obj.item = items;
  obj.region = trainsData[items].region;
  obj.quantity = trainsData[items].quantity;
  obj.unit = 'km';
  obj.categories = ['trains', trainsData[items].category];
  obj.components = [
    {
      name: 'CO2',
      quantity: [trainsData[items].C02],
      unit: trainsData[items].unit,
    },
    {
      name: 'NO2',
      quantity: [trainsData[items].NO2],
      unit: trainsData[items].unit,
    },
    {
      name: 'CH4',
      quantity: [trainsData[items].CH4],
      unit: trainsData[items].unit,
    },
  ];
  emissions.push(obj);
}

Emission.create(emissions, err => {
  if (err) throw err;
  mongoose.connection.close();
});
