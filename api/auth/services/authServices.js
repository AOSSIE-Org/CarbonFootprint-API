const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const redis = require('../../../framework/redis');
// import Redis client
const { redisClient } = redis;
// import user model
const User = require('../../models/userModel');

// Generate a api key using random and the provided email.
const generateApiKey = email => {
  const random = uuidv4();
  return uuidv5(email, random);
};

// get user from the database by its email address
const retrieveApiKey = email =>
  new Promise((resolve, reject) => {
    // find the user in the Redis cache
    redisClient.hget('users', email, (err, result) => {
      if (err || !result) {
        // find the user in the database
        User.findOne(
          {
            email,
          },
          (err2, user) => {
            if (!err2 && user) {
              resolve(user);
            } else reject(new Error('Unable to find the user'));
          },
        );
      } else {
        resolve(JSON.parse(result));
      }
    });
  });

// Create and store API key
const createApiKey = email =>
  new Promise((resolve, reject) => {
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
        user.requests.resetTime = +new Date();
        // + 24 * 3600 * 1000;
        user.save(err => {
          if (err) reject(new Error('Error while creating the key'));
          else {
            // storing the user in the Redis cache
            redisClient.hset(
              'users',
              email,
              JSON.stringify(user.toObject()),
              err2 => {
                if (err2) reject(new Error('Error while creating the key'));
              },
            );
            resolve(user);
          }
        });
      });
  });

// delete API Key
const deleteApiKey = email =>
  new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (!err && user) {
          user.remove(err2 => {
            if (err2) reject(new Error('Unable to delete the key'));
            else {
              // delete the user from Redis
              redisClient.hdel('users', email, err3 => {
                if (!err3) resolve('Key deleted successfully');
                else reject(new Error('Unable to delete the key'));
              });
            }
          });
        } else reject(new Error('Unable to delete the key'));
      },
    );
  });

// Function to create , store , revoke apikey.
// Supported actions - create , retrieve , revoke
const apiKey = (mail, action) =>
  new Promise((resolve, reject) => {
    if (action === 'create') {
      const create = createApiKey(mail);
      create
        .then(result => {
          resolve(result);
        })
        .catch(() => {
          reject(new Error('User not found'));
        });
    }
    if (action === 'retrieve') {
      const apiToken = retrieveApiKey(mail);
      apiToken
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }
    if (action === 'revoke') {
      const apiToken = deleteApiKey(mail);
      apiToken
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }
  });

exports.auth = async (email, action) => {
  const value = await apiKey(email, action);
  return value;
};

// Verify API Key
exports.verifyApiKey = (req, res, next) => {
  const apikey = req.headers['access-key'];
  User.findOne(
    {
      apikey,
    },
    (err, user) => {
      // if user is found
      if (!err && user) {
        const currDate = new Date();
        const prevTime = new Date(String(user.requests.resetTime));
        // find the difference in hours between current time and previous reset time.
        const resetTimeCheck = Math.abs(currDate - prevTime) / 36e5;
        if (resetTimeCheck >= 24) {
          User.updateOne(
            {
              email: user.email,
            },
            {
              email: user.email,
              apikey: user.apikey,
              requests: {
                allowed: user.requests.allowed,
                left: user.requests.allowed - 1,
                resetTime: currDate,
              },
            },
            err2 => {
              if (!err2) {
                res.set('X-RateLimit-Limit', user.requests.allowed);
                res.set('X-RateLimit-Remaining', user.requests.left - 1);
                // res.headers['X-RateLimit-Reset'] = 1372700873
                next();
              }
            },
          );
        } else if (user.requests.left !== 0) {
          User.updateOne(
            {
              email: user.email,
            },
            {
              email: user.email,
              apikey: user.apikey,
              requests: {
                allowed: user.requests.allowed,
                left: user.requests.left - 1,
                resetTime: user.requests.resetTime,
              },
            },
            err2 => {
              if (!err2) {
                res.set('X-RateLimit-Limit', user.requests.allowed);
                res.set('X-RateLimit-Remaining', user.requests.left - 1);
                // res.headers['X-RateLimit-Reset'] = 1372700873
                next();
              }
            },
          );
        } else {
          res.sendJsonError('Your API call limits are deplenished', 401);
        }
      } else res.sendJsonError('Unauthorised or missing access token', 401);
    },
  );
};
