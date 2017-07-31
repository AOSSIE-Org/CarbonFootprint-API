const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

// import user model
const User = require('../models/userModel');

// Generate a api key using random and the provided email.
const generateApiKey = email => {
  const random = uuidv4();
  return uuidv5(email, random);
};

// get user from the database by its email address
const retrieveApiKey = email => {
  return new Promise((resolve, reject) => {
    // find the user in the database
    User.findOne({ email: email }, (err, user) => {
      if (!err && user) {
        resolve(user);
      } else reject('Unable to find the user');
    });
  });
};

// Create and store API key
const createApiKey = email => {
  return new Promise((resolve, reject) => {
    retrieveApiKey(email)
      .then(() => {
        resolve('API key already exists'); // throw an error if user already exists
      })
      .catch(() => {
        const apiKey = generateApiKey(email);
        const user = new User();
        user.email = email;
        user.apikey = apiKey;
        user.requests.allowed = 1000;
        user.requests.left = 1000;
        user.requests.resetTime = +new Date() + 24 * 3600 * 1000;
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
        user.remove(err => {
          if (err) reject('Unable to delete the key');
          else resolve('Key deleted successfully');
        });
      } else reject('Unable to delete the key');
    });
  });
};

//Function to create , store , revoke apikey.
//Supported actions - create , retreive , revoke
let apiKey = (mail, action) => {
  return new Promise((resolve, reject) => {
    if (action == 'create') {
      let create = createApiKey(mail);
      create
        .then(function(result) {
          resolve(result);
        })
        .catch(function(reject) {
          reject('User not found');
        });
    }
    if (action == 'retrieve') {
      let apiToken = retrieveApiKey(mail);
      apiToken
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    }
    if (action == 'revoke') {
      let apiToken = deleteApiKey(mail);
      apiToken
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    }
  });
};

exports.auth = async function(email, action) {
  let auth = await apiKey(email, action);
  return auth;
};

//Verify API Key
exports.verifyApiKey = (req, res, next) => {
  const apikey = req.headers['access-key'];
  User.findOne({ apikey: apikey }, (err, user) => {
    // if user is found
    if (!err && user) {
      if (user.requests.left != 0) {
        User.update(
          { email: user.email },
          {
            email: user.email,
            apikey: user.apikey,
            requests: {
              left: user.requests.left - 1
            }
          },
          err => {
            if (!err) {
              res.set('X-RateLimit-Limit', user.requests.allowed);
              res.set('X-RateLimit-Remaining', user.requests.left - 1);
              // res.headers['X-RateLimit-Reset'] = 1372700873
              next();
            }
          }
        );
      } else {
        res.status(401).json({
          success: false,
          err: 'Your API call limits are deplenished'
        });
      }
    } else
      res.status(401).json({
        success: false,
        err: 'Unauthorised or missing access token'
      });
  });
};
