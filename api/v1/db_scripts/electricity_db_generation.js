//To run this script use "node electricty_db_generation.js"
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
}); 

// If the connection throws an error
mongoose.connection.on('error', (err) => {  
  console.log('Error connecting to database: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  console.log('Database disconnected'); 
});
var Emission = require('../models/emissionschema.js')

var json = require('../../../raw_data/electricty_emission.json');
for(js in json){
  var obj = new Emission();
  obj.item="generation";
  obj.itemType="atomic";
  obj.region=json[js]['Country'];
  obj.quantity=1;
  obj.units="kg/kWh";
  obj.components=[
    {
    	name: "CO2",
    	quantity: json[js]['Generation-CO2'],
    	units: "kgCO2/kWh"
    },{
    	name: "CH4",
    	quantity: json[js]['Generation-CH4'],
    	units: "kgCH4/kWh"
    },{
    	name: "N20",
    	quantity: json[js]['Generation-N20'],
    	units: "kgN20/kWh"
    }]
    obj.save(function(err){
      if ( err ) throw err;
      console.log("Object Saved Successfully");
    });
    // console.log(obj);
}
// var obj = new Emission({
//     item:"generation",
//     itemType: "atomic",
//     region: "Africa",
//     quantity: 1,
//     units: "kg/kWh",
//     components: [{
//     	name: "CO2",
//     	quantity: 0.73576632,
//     	units: "kgCO2/kWh"
//     },{
//     	name: "CH4",
//     	quantity: 0.00001173634,
//     	units: "kgCH4/kWh"
//     },{
//     	name: "N20",
//     	quantity: 0.00000857091,
//     	units: "kgCH4/kWh"
//     }]
// })
// obj.save(function(err){
//   if ( err ) throw err;
//   console.log("Book Saved Successfully");
// });

// console.log(obj);
//Emission.collection.drop({});