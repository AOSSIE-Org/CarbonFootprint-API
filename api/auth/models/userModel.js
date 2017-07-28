var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for for generation of user api keys and rate limiting.
var userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	apikey: {
		type: String,
		required: true,
	},
	ratelimit: {
		type: Number,
		required: true,
		default: 1000
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('User', userSchema);