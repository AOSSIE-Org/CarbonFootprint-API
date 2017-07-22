const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

// import user model
const User = require('../models/userModel');

// Generate a api key using random and the provided email.
const generateApiKey = email => {
  const random = uuidv4(); //
  return uuidv5(email, random);
};

// get user from the database by its email address
const retrieveApiKey = email => {
  return new Promise((resolve, reject) => {
    // find the user in the database
    User.findOne({ email: email }, (err, user) => {
      if (!err && user) resolve(user);
      else reject('Unable to find the user');
    });
  });
};

// Create and store API key
const createApiKey = email => {
  return new Promise((resolve, reject) => {
    retrieveApiKey(email)
      .then(() => {
        reject('API key already exists'); // throw an error if user already exists
      })
      .catch(() => {
        const apiKey = generateApiKey(email);
        const user = new User();
        user.email = email;
        user.apikey = apiKey;
        user.ratelimit = 1000;
        user.save(err => {
          if (err) reject('Error while creating the key');
          else resolve(user);
        });
      });
  });
};

// delete API Key
const deleteApiKey = email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (err, user) => {
      if (!err && user) {
        user.remove();
        resolve('Key deleted successfully');
      } else reject('Unable to delete the key');
    });
  });
};

//Function to create , store , revoke apikey.
//Supported actions - create , retreive , revoke
let apiKey = (mail, action) => {
  if (action == 'create') {
    createApiKey(mail);
    return true;
  }
  if (action == 'retrieve') {
    let apiToken = retrieveApiKey(mail);
    apiToken
      .then(function(result) {
        console.log(result);
      })
      .catch(function(reject) {
        console.log('user not found');
      });
    return true;
  }
  if (action == 'revoke') {
    let apiToken = deleteApiKey(mail);
    apiToken
      .then(function(result) {
        console.log(result);
      })
      .catch(function(reject) {
        console.log('user not found');
      });
    return true;
  }
};

exports.auth = async function(email, action) {
  let auth = await apiKey(email, action);
  return true;
};

//Verify API Key
let verifyApiKey = (apikey) => {
    return new Promise((resolve, reject) => {
        // find the apikey in the database
        User.findOne({
            $or: [{
                'apikey': new RegExp(`^${apikey}$`, "i"),
            }]
        }, (err, user) => {
            // if user is found
            if (!err && user) {
                if (user.ratelimit != 0) {
                    User.update({
                        email: user.email
                    }, {
                        email: user.email,
                        apikey: user.apikey,
                        ratelimit: user.ratelimit-1
                    }, function (err) {
                        console.log("Cannot save new rate limit");
                    })
                   resolve(user.ratelimit); 
                }
            } else reject(`Unable to find user`);
        });
    });
}

exports.verifyapikey = async function (req, res) {
    let verifykey = await verifyApiKey(req);
    return verifykey;
}