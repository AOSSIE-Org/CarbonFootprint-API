//To run this script use "node electricty_db_td.js"
// database setup
var mongoose = require('mongoose');
// get the database configuration file
try {
  var config = require('../../../config.json');
} catch (e) {
  console.log(`Database configuration file "config.json" is missing.`);
  process.exit(1);
}
var db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`);

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Connection to database established successfully');
  console.log("electricity_db.js running");
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to database: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
var Emission = require('../models/emissionModel.js')
var json = require('../../../raw_data/electricty_emission.json');
for(js in json){
  var obj = new Emission();
  obj.item="td";
  obj.region=json[js]['Country'];
  obj.quantity=[1];
  obj.unit="kg/kWh";
  obj.categories=["electricity"];
  obj.components=[
    {
    	name: "CO2",
    	quantity: [json[js]['Td-CO2']],
    	unit: "kg CO2/kWh"
    },{
    	name: "CH4",
    	quantity: [json[js]['Td-CH4']],
    	unit: "kg CH4/kWh"
    },{
    	name: "N2O",
    	quantity: [json[js]['Td-N2O']],
    	unit: "kg N20/kWh"
    }]
  obj.save(function(err){
    if ( err ) throw err;
    console.log("Object Saved Successfully");
  });
    //console.log(obj);
}
mongoose.connection.close();
