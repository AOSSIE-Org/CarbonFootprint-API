const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const googleFitSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  distance: [{
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  }],
  steps: [{
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  }],
});

const googleFit = mongoose.model('googleFit', googleFitSchema);

module.exports = googleFit;
