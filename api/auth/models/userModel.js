const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for for generation of user api keys and rate limiting.
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    apikey: {
      type: String,
      required: true
    },
    requests: {
      allowed: {
        type: Number,
        required: true,
        default: 1000
      },
      left: {
        type: Number,
        required: true,
        default: 1000
      },
      resetTime: {
        type: Date,
				required: true
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
