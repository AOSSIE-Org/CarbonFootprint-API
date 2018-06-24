require('dotenv').config();
// redis setup
const redis = require('redis');
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

// connect to the redis
const redisLink = `redis://${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = redis.createClient(redisLink);

redisClient
    // if the connection throws an error
    .on('error', err => console.log(`Redis connection failed: ${err}`))
    // if the connection is connected
    .on('connect', () => console.log('Redis connected successfully'));

module.exports = {
  redis: redis,
  redisClient: redisClient
};