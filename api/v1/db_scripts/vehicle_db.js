//To run this script use "node vehicle_db.js"
// database setup
var mongoose = require('mongoose');
// get the database configuration file
try {
	var config = require('../../../config.json');
}
catch(e){
	console.log(`Database configuration file "config.json" is missing.`);
	process.exit(0);
}
var db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`);

// When successfully connected
mongoose.connection.on('connected', () => {  
    console.log('Connection to database established successfully');
    console.log("vehicle_db.js running");
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
var json = require('../../../raw_data/fuels.json');
for(js in json){
  var obj = new Emission();
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
    }]
  obj.save(function(err){
    if ( err ) throw err;
    console.log("Object Saved Successfully");
  });
  //console.log(obj);
}
mongoose.connection.close();
