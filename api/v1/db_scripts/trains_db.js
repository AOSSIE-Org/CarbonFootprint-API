//run node trains_db.js to add data to db.
var mongoose = require('mongoose');

try{
    var config = require('../../../config.json');
}
catch(err){
    console.error('Database configuration file \'config.json\' is missing.');
    process.exit(0);
}
var db = config.database;

mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`);

mongoose.connection.on('connected',() => {
    console.log('Connection to database established successfully');
});

mongoose.connection.on('error',(err) => {
    console.error('Error connecting to database: ${err}');
});

mongoose.connection.on('disconnected',() => {
    console.log('Database disconnected');
});

var Emission = require('../models/emissionModel.js');

var obj = new Emission();
var trainsData = require("../../../raw_data/trains.json");

for(items in trainsData){
    var obj = new Emission();
    obj.item = items;
    obj.region = trainsData[items]['region'];
    obj.quantity = trainsData[items]['quantity'];
    obj.unit = 'km';
    obj.categories = ["trains",trainsData[items]['category']];
    obj.components = [
        {
            name:'CO2',
            quantity :[trainsData[items]['C02']],
            unit : trainsData[items]['unit']
        },
        {
            name:'NO2',
            quantity:[trainsData[items]['NO2']],
            unit:trainsData[items]['unit']
        },
        {
            name:'CH4',
            quantity:[trainsData[items]['CH4']],
            unit:trainsData[items]['unit']
        }
    ];
    save(obj,items);
}

async function save(obj,items){
    await obj.save((err)=>{
        if(err) console.error(err);
        else console.log("Object for item "+items + " saved successfully");
        
    });
    // console.log(obj);
}
mongoose.connection.close();
