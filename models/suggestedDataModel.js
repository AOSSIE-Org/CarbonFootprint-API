const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

// create a schema for general schema to deal with emissions.
const suggestedDataModel = new Schema({
  title: String,
  data: {},
  createdby: String,
  createdAt: { type: Date, default: Date.now },
  state: {
    type: String,
    required: true,
    enum: ['Accepted', 'Pending', 'Rejected'],
  },
});

module.exports = mongoose.model('suggestedData', suggestedDataModel);
