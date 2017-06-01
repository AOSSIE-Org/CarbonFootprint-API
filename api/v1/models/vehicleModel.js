var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vehicleSchema = new Schema({
  name: String,
  type: String
});

module.exports =  mongoose.model('Vehicle', vehicleSchema);
