var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for general schema to deal with emissions.
var emissionSchema = new Schema({
    item: {
    	type: String,
    	required: true
    },
    region: {
    	type: String,
    	required: true,
        default: 'Default'
    },
    quantity: {
    	type: [Number],
    	required: true,
    	default: [1]
    },
    unit: {
    	type: String,
    	required: true
    },
    categories: [String],
    calculationMethod: String,
    components: [{
    	name: String,
    	quantity: [Number],
    	unit: String
    }]
})                        

module.exports =  mongoose.model('Emission', emissionSchema);