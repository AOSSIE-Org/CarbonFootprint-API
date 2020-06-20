// eslint-disable-next-line import/no-extraneous-dependencies
require('module-alias/register');

// To run this script use "node flights_db.js"
// database setup
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// get the logger
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// get the database configuration file
// eslint-disable-next-line import/no-unresolved
const config = require('@root/config.json');
// eslint-disable-next-line import/no-unresolved
const json = require('@raw_data/flights.json');

try {
  if (!config) {
    throw new Error('config.json missing');
  }
} catch (e) {
  Logger.error('Database configuration file "config.json" is missing.');
  process.exit(1);
}
const db = config.database;

// connect to the database
mongoose.connect(`mongodb+srv://${db.username}:${db.password}@${db.hostname}/${db.dbname}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
  Logger.info('flights_db.js running');
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});
const Emission = require('../../models/emissionModel.js');

const dist = [
  125,
  250,
  500,
  750,
  1000,
  1500,
  2000,
  2500,
  3000,
  3500,
  4000,
  4500,
  5000,
  5500,
  6000,
  6500,
  7000,
  7500,
  8000,
  8500,
];

const emissions = [];
for (let js = 0; js < json.length; js++) {
  const obj = new Emission();
  obj.item = `airplane model ${json[js]['airplane model']}`;
  obj.region = 'Default';

  obj.quantity = [];
  obj.unit = 'nm';
  obj.categories = ['flights'];
  obj.calculationMethod = 'interpolation';
  obj.components = [
    {
      name: 'airplane fuel',
      quantity: [],
      unit: 'kg',
    },
  ];
  for (let ds = 0; ds < dist.length; ds++) {
    if (json[js][dist[ds]]) {
      obj.quantity.push(dist[ds]);
      obj.components[0].quantity.push(json[js][dist[ds]]);
    }
  }
  emissions.push(obj);
}

let obj = new Emission();
obj.item = 'airplane model A380';
obj.region = 'Default';
obj.quantity = [
  125,
  250,
  500,
  750,
  1000,
  1500,
  2000,
  2500,
  3000,
  3500,
  4000,
  4500,
  5000,
  5500,
  6000,
  6500,
  7000,
  7500,
  8000,
  8500,
  9000,
  9500,
  10000,
  10500,
  11000,
  11500,
  12000,
];
obj.unit = 'nm';
obj.categories = ['flights'];
obj.calculationMethod = 'interpolation';
obj.components = [
  {
    name: 'airplane fuel',
    quantity: [
      5821,
      12016,
      17623,
      24940,
      32211,
      46695,
      61160,
      75638,
      90143,
      104681,
      119255,
      133865,
      148512,
      163196,
      177916,
      192517,
      203465,
      214166,
      224632,
      235540,
      244520,
      252370,
      259010,
      264340,
      268260,
      270670,
      271480,
    ],
    unit: 'kg',
  },
];
emissions.push(obj);

obj = new Emission();
obj.item = 'airplane model A320';
obj.region = 'Default';
obj.quantity = [125, 250, 500, 750, 1000, 1500, 2000, 2500];
obj.unit = 'nm';
obj.categories = ['flights'];
obj.calculationMethod = 'interpolation';
obj.components = [
  {
    name: 'airplane fuel',
    quantity: [1672, 3430, 4585, 6212, 7772, 10766, 13648, 16452],
    unit: 'kg',
  },
];
emissions.push(obj);

obj = new Emission();
obj.item = 'airplane fuel';
obj.region = 'Default';
obj.quantity = [1];
obj.unit = 'kg';
obj.categories = ['flights', 'transport'];
obj.components = [
  {
    name: 'CO2',
    quantity: [0.00316],
    unit: 'kg',
  },
];
emissions.push(obj);

Emission.create(emissions, err => {
  if (err) throw err;
  mongoose.connection.close();
});
