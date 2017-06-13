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
var Emission = require('../models/emissionModel.js')


var obj = new Emission();
obj.item="airplane model A380";
obj.region="Default";
obj.quantity=[125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000];
obj.unit="nm";
obj.categories=["flights"];
obj.calculationMethod="interpolation"
obj.components=[
{
    name: "airplane fuel",
    quantity: [5821, 12016, 17623, 24940, 32211, 46695, 61160, 75638, 90143, 104681, 119255, 133865, 148512, 163196, 177916, 192517, 203465, 214166, 224632, 235540, 244520, 252370, 259010, 264340, 268260, 270670, 271480],
    unit: "kg"
}]
obj.save(function(err){
if ( err ) throw err;
console.log("Object Saved Successfully");
});
console.log(obj);

var obj = new Emission();
obj.item="airplane model A320";
obj.region="Default";
obj.quantity=[125, 250, 500, 750, 1000, 1500, 2000, 2500];
obj.unit="nm";
obj.categories=["flights"];
obj.calculationMethod="interpolation"
obj.components=[
{
    name: "airplane fuel",
    quantity: [1672,3430,4585,6212,7772,10766,13648,16452],
    unit: "kg"
}]
obj.save(function(err){
if ( err ) throw err;
console.log("Object Saved Successfully");
});

var obj = new Emission();
obj.item="airplane fuel";
obj.region="Default";
obj.quantity=[1];
obj.unit="kg";
obj.categories=["flights"];
obj.components=[
{
    name: "CO2",
    quantity: [0.00316],
    unit: "kg"
}]
obj.save(function(err){
if ( err ) throw err;
console.log("Object Saved Successfully");
});