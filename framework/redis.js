require('dotenv').config();
// get the logger
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
// redis setup
const redis = require('redis');

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

// connect to the redis
const redisLink = `redis://${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = redis.createClient(redisLink);

redisClient
  // if the connection throws an error
  .on('error', (err) => {
    Logger.error(`Redis connection failed: ${err}`);
    throw new Error(`Redis connection failed: ${err}`);
  })
  // if the connection is connected
  .on('connect', () => Logger.info('Redis connected successfully'));

module.exports = {
  redis,
  redisClient,
};
