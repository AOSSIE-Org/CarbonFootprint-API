//Importing User Schema
var User = require('../models/userModel');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

// Generate a api key using random and the provided email.
let generateApiKey = (email) => {
    const random = uuidv4(); // 
    return(uuidv5(email, random));
}
// Create and store apikey
let createApiKey = (email) => {
    let apiKey = generateApiKey(email);
    var user = new User();
    user.email = "email";
    user.apiKey = apiKey;
    user.ratelimit = 1000;
    user.save(function(err){
    if ( err ) throw err;
    console.log("User API Key Saved");
    });
}

//Function to create , store , revoke apikey.
//Supported actions - create , retreive , revoke
let apiKey = (mail, action) => {
    if (action == "create"){
        createApiKey(mail);
        return("success");
    }
    if (action == "retreive"){

    }
    if (action == "revoke"){

    }    
}
console.log(apiKey("saisankargochhayat@gmail.com","create"));
