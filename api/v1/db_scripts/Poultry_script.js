require('module-alias/register');

//To run this script use "node Poultry_script.js"
//To run this script use "node appliances_db.js"
// database setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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
  Logger.info("poultry_scipt.js running");
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
const json = require('@raw_data/poultry.json');
emissions = [];
const data = json['data'];
for(let x=0;x<data.length;x++){
  let obj = new Emission();
  obj.item= data[x]['type'];
  obj.region=data[x]['region'];
  obj.quantity=[1];
  obj.unit=data[x]['unit'];
  obj.categories=["poultry"];

  /**
   * pf_emission : Post farmgate emission
   * p_emissions : Production emission
   * wl_factor : Waste loss factor
   * ml_factor : Moisture loss factor
   */

  obj.components=[
    {
    	name: "CO2",
    	quantity: data[x]['p_emissions']*data[x]['wl_factor']*data[x]['ml_factor'] + data[x]['pf_emissions'],
    	unit: (data[x]['unit'].length>1)? `kg CO2/${data[x]['unit']}`:'kg CO2'
    },{
    	name: "CH4",
    	quantity: 0,
    	unit: (data[x]['unit'].length>1)? `kg CH4/${data[x]['unit']}`:'kg CH4'
    },{
    	name: "N2O",
    	quantity: 0,
    	unit: (data[x]['unit'].length>1)? `kg N2O/${data[x]['unit']}`: 'kg N2O'
    }];
  emissions.push(obj);
}

Emission.create(emissions, function (err) {
  if (err) throw err;
  mongoose.connection.close();
});
