
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for emissions related to electricity
var electricitySchema = new Schema({
    country: String,
	
    generation: {
        co2: Number,
        ch4: Number,
        no2: Number
    },
    transmission: {
        co2: Number,
        ch4: Number,
        no2: Number
    },
    consumption: {
        co2: Number,
        ch4: Number,
        no2: Number
    }
}) 

module.exports =  mongoose.model('Electricity', electricitySchema);