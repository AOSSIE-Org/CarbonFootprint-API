require('module-alias/register');

//To run this script use "node vehicle_db.js"
// database setup
const mongoose = require('mongoose');
// get the logger
const Logger  = require('@framework/Logger');
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
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`, { useMongoClient: true });

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
  Logger.info("vehicle_db.js running");
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});
const Emission = require('../models/emissionModel.js');
const json = require('@raw_data/fuels.json');
emissions = [];
for(js in json){
  let obj = new Emission();
  obj.item=json[js]['langKey'];
  obj.region="Default";
  obj.quantity=[1];
  obj.unit="L";
  obj.categories=["vehicle","transport"];
  obj.components=[
    {
    	name: "CO2",
    	quantity: [json[js]['CO2Emission']],
    	unit: "kg CO2/L"
    },{
    	name: "CH4",
    	quantity: [json[js]['CH4Emission']],
    	unit: "kg CH4/L"
    },{
    	name: "N2O",
    	quantity: [json[js]['N2OEmission']],
    	unit: "kg N2O/L"
    },{
    	name: "GHG",
    	quantity: [json[js]['GHGEmission']],
    	unit: "kg GHG/L"
    }];
  emissions.push(obj);
}

Emission.create(emissions, function (err) {
  if (err) throw err;
  mongoose.connection.close();
});