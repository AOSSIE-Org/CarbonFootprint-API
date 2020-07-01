const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const googleFitSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  distance: {
    type: Number,
    default: 0,
    required: true,
  },
  steps: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const googleFit = mongoose.model('googleFit', googleFitSchema);

module.exports = googleFit;
