//To run this script use "node appliances_db.js"
// database setup
const mongoose = require('mongoose');
// get the database configuration file
try {
  const config = require('../../../config.json');
} catch (e) {
  console.log(`Database configuration file "config.json" is missing.`);
  process.exit(1);
}
let db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`, { useMongoClient: true });

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Connection to database established successfully');
  console.log("appliances_db.js running");
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to database: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
let json = require('../../../raw_data/appliances.json');
for (js in json) {
  let Emission = require('../models/emissionModel.js')
  let obj = new Emission();
  obj.item = json[js]['Appliance'];
  obj.region = "Default";
  obj.quantity = [1];
  obj.unit = "kWh";
  obj.categories = ["appliances"];
  obj.components = [{
    name: "electricity",
    quantity: json[js]['Average_watts (in Wh)'] / 1000,
    unit: "kWh"
  }]
  obj.save(err => {
    if (err) throw err;
    console.log("Object Saved Successfully");
  });
  // console.log(obj);
}
mongoose.connection.close();
