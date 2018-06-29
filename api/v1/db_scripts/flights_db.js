//To run this script use "node flights_db.js"
// database setup
const mongoose = require('mongoose');
// get the logger
const Logger  = require('../../../framework/Logger');
// get the database configuration file
const config = require('../../../config.json');
try {
  config
} catch (e) {
  Logger.error(`Database configuration file "config.json" is missing.`);
  process.exit(1);
}
let db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`, { useMongoClient: true });

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
  Logger.info("flights_db.js running");
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error('Error connecting to database: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});
let Emission = require('../models/emissionModel.js')
let dist = [125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500];
let json = require('../../../raw_data/flights.json');
for(js in json){
  let obj = new Emission();
  obj.item=`airplane model ${json[js]["airplane model"]}`;
  obj.region="Default";

  obj.quantity=[];
  obj.unit="nm";
  obj.categories=["flights"];
  obj.calculationMethod="interpolation"
  obj.components=[
  {
      name: "airplane fuel",
      quantity: [],
      unit: "kg"
  }]
  for(ds in dist){
    if (json[js][dist[ds]]){
      obj.quantity.push(dist[ds]);
      obj.components[0].quantity.push(json[js][dist[ds]]);
    }
  }
  obj.save(err => {
  if ( err ) throw err;
    Logger.info("Object Saved Successfully");
  });
}

obj = new Emission();
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
obj.save(err => {
if ( err ) throw err;
  Logger.info("Object Saved Successfully");
});

obj = new Emission();
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
obj.save(err => {
if ( err ) throw err;
  Logger.info("Object Saved Successfully");
});

obj = new Emission();
obj.item="airplane fuel";
obj.region="Default";
obj.quantity=[1];
obj.unit="kg";
obj.categories=["flights","transport"];
obj.components=[
{
    name: "CO2",
    quantity: [0.00316],
    unit: "kg"
}]
obj.save(err => {
if ( err ) throw err;
  Logger.info("Object Saved Successfully");
});

mongoose.connection.close();
