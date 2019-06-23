const mongoose = require("mongoose");

const DailyEmissionSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: new Date(new Date().toDateString())
  },
  quantity: {
    type: Number,
    required: true
  }
});

const DailyEmission = mongoose.model("DailyEmission", DailyEmissionSchema);

module.exports = DailyEmission;
