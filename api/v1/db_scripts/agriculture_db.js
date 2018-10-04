require('module-alias/register');

// to run this script use "node agriculture_db.js"
// database setup
const mongoose = require('mongoose');
// get the logger
const Logger = require('@framework/Logger');
// get the database configuration file
const config = require('@root/config.json');
const async = require('async');
try {
  config
} catch (e) {
  Logger.error(`Database configuration file "config.json" is missing.`);
  process.exit(1);
}
const db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`, {useMongoClient: true});

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
  Logger.info('agriculture_db.js running');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});
const json = require('@raw_data/emissions_agriculture.json');
const Emission = require('../models/emissionModel.js');
emissions = [];
for (js in json) {
  let obj = new Emission();
  obj.item = json[js]['Item'];
  obj.region = json[js]['Area'];
  obj.quantity = [1];
  obj.unit = 'year';
  obj.categories = ['agriculture'];
  obj.components = [{
    name: 'CO2',
    quantity: json[js]['Value'],
    unit: json[js]['Unit']
  }];
  emissions.push(obj);
}

Emission.create(emissions, function (err) {
  if (err) throw err;
  mongoose.connection.close();
});