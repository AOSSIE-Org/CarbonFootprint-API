// to run this script use "node sector_db.js"
// database setup
const mongoose = require('mongoose');
// get the database configuration file
const config = require('../../../config.json');
try {
  config
} catch (e) {
  console.log(`Database configuration file "config.json" is missing.`);
  process.exit(1);
}
const db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`, {useMongoClient: true});

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Connection to database established successfully');
  console.log('sector_db.js running');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
let json = require('../../../raw_data/emissions_sector.json');
for (js in json) {
  let Emission = require('../models/emissionModel.js');
  let obj = new Emission();
  obj.item = json[js]['Item'];
  obj.region = json[js]['Area'];
  obj.quantity = [1];
  obj.unit = 'year';
  obj.categories = ['sector'];
  obj.components = [{
    name: 'CO2',
    quantity: json[js]['Value'],
    unit: json[js]['Unit']
  }];
  obj.save(err => {
    if (err) throw err;
    console.log('Object Saved Successfully');
  });
}
mongoose.connection.close();
