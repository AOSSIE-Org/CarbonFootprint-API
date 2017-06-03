var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for emissions related to electricity
var emissionSchema = new Schema({
    item: {
    	type: String,
    	required: true
    },
    itemType: {
    	type: String,
    	required: true
    },
    country: {
    	type: String,
    	required: true
    },
    countryCode: {
    	type: String,
    	required: true
    },
    quantity: {
    	type: Number,
    	required: true,
    	default: 1
    },
    units: {
    	type: String,
    	required: true
    },
    components: [{
    	name: String,
    	quantity: String,
    	units: String
    }],
    emissions: {
    	CO2: Number,
    	NO2: Number,
    	CH4: Number
    }
})                        

module.exports =  mongoose.model('Emission', emissionSchema);