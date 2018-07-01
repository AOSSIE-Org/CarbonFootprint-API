const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for general schema to deal with emissions.
const suggestedDataModel = new Schema({
    title: String,
    data: {},
    createdby: String,
    createdAt: {type: Date, default: Date.now},
    state: {
        type: String,
        required: true,
        enum: ['Accepted', 'Pending', 'Rejected']
    }
})

module.exports =  mongoose.model('suggestedData', suggestedDataModel);