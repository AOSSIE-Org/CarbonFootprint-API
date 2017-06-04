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
    region: {
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
    	quantity: Number,
    	units: String
    }]
})                        

module.exports =  mongoose.model('Emission', emissionSchema);