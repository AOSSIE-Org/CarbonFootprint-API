//To run this script use "node electricity_db_generation.js"
// database setup
const mongoose = require('mongoose');
// get the logger
const Logger  = require('@framework/Logger');
// get the database configuration file
const config = require('@root/config.json');
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
  Logger.info("electricity_db_generation.js running");
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});
let Emission = require('../models/emissionModel.js')

let json = require('@raw_data/electricty_emission.json');
for(js in json){
  let obj = new Emission();
  obj.item="generation";
  obj.region=json[js]['Country'];
  obj.quantity=[1];
  obj.unit="kg/kWh";
  obj.categories=["electricity"];
  obj.components=[
    {
    	name: "CO2",
    	quantity: [json[js]['Generation-CO2']],
    	unit: "kg CO2/kWh"
    },{
    	name: "CH4",
    	quantity: [json[js]['Generation-CH4']],
    	unit: "kg CH4/kWh"
    },{
    	name: "N2O",
    	quantity: [json[js]['Generation-N2O']],
    	unit: "kg N2O/kWh"
    }]
  obj.save(err => {
    if ( err ) throw err;
    Logger.info("Object Saved Successfully");
  });
}
mongoose.connection.close();
