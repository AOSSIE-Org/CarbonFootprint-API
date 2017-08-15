 //To run this script use "node Poultry_script.js"
// database setup
var mongoose = require('mongoose');
// get the database configuration file
try {
	require('dotenv').config()
}
catch(e){
	console.log(`Database configuration file "config.json" is missing.`);
	process.exit(0);
}
// connect to the database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

// When successfully connected
mongoose.connection.on('connected', () => {  
    console.log('Connection to database established successfully');
    console.log("poultry_db.js running");
}); 

// If the connection throws an error
mongoose.connection.on('error', (err) => {  
  console.log('Error connecting to database: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  console.log('Database disconnected'); 
});
var Emission = require('../models/emissionModel.js');

var json = require('../../../raw_data/poultry.json');
// console.log(json['data'].length)
var data = json['data'];
for(var x=0;x<data.length;x++){
	//console.log(data[x]['type']);
  var obj = new Emission();
  obj.item= data[x]['type'];
  obj.region=data[x]['region'];
  obj.quantity=[1];
  obj.unit=data[x]["unit"];
  obj.categories=["poultry"];

  /**
   * pf_emission : Post farmgate emission
   * p_emissions : Production emission
   * wl_factor : Waste loss factor
   * ml_factor : Moisture loss factor
   */

  obj.components=[
    {
    	name: "CO2",
    	quantity: data[x]['p_emissions']*data[x]['wl_factor']*data[x]['ml_factor'] + data[x]['pf_emissions'],
    	unit: (data[x]['unit'].length>1)? `kg CO2/${data[x]['unit']}`:'kg CO2'
    },{
    	name: "CH4",
    	quantity: 0,
    	unit: (data[x]['unit'].length>1)? `kg CH4/${data[x]['unit']}`:'kg CH4'
    },{
    	name: "N2O",
    	quantity: 0,
    	unit: (data[x]['unit'].length>1)? `kg N2O/${data[x]['unit']}`: 'kg N2O'
    }]
  obj.save(function(err,data){
    if ( err ) throw err;
    console.log(`Object Saved Successfully for ${data}`);
  });
    //console.log(obj);
}

mongoose.connection.close();
