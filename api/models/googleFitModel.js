const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const googleFitSchema = new mongoose.Schema({
  userId: {
    type: String,
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

googleFitSchema.index({ userId: 1, date: 1 }, { unique: true });
const googleFit = mongoose.model('googleFit', googleFitSchema);

module.exports = googleFit;
