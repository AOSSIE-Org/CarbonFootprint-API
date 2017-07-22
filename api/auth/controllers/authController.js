//Importing User Schema
var User = require('../models/userModel');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

// Generate a api key using random and the provided email.
let generateApiKey = (email) => {
    const random = uuidv4(); // 
    return (uuidv5(email, random));
}
// Create and store apikey
let createApiKey = (email) => {
    let apiKey = generateApiKey(email);
    var user = new User();
    user.email = email;
    user.apikey = apiKey;
    user.ratelimit = 1000;
    user.save(function (err) {
        if (err) throw err;
        console.log("User API Key Saved");
    });
}
//Retreive API Key
let retreiveApiKey = (email) => {
    return new Promise((resolve, reject) => {
        // find the user in the database
        User.findOne({
            $or: [{
                'email': new RegExp(`^${email}$`, "i"),
            }]
        }, (err, user) => {
            // if user is found
            if (!err && user) {
                resolve(user.apikey);
            }
            else reject(`Unable to find user`);
        });
    });
}
//Revoke API Key
let revokeApiKey = (email) => {
    return new Promise((resolve, reject) => {
        // find the user in the database
        User.findOne({
            $or: [{
                'email': new RegExp(`^${email}$`, "i"),
            }]
        }, (err, user) => {
            // if user is found
            if (!err && user) {
                user.remove();
                resolve("removed user");
            }
            else reject(`Unable to find user`);
        });
    });
}

//Function to create , store , revoke apikey.
//Supported actions - create , retreive , revoke
let apiKey = (mail, action) => {
    if (action == "create") {
        createApiKey(mail);
        return true;
    }
    if (action == "retreive") {
        let apiToken = retreiveApiKey(mail);
        apiToken.then(function (result) {
            console.log(result) 
        })
        return true;
    }
    if (action == "revoke") {
        let apiToken = revokeApiKey(mail);
        apiToken.then(function (result) {
            console.log(result) 
        })
        return true;
    }
}

exports.auth = async function (email, action) {
    let auth = await apiKey(email, action);
    return true;
}