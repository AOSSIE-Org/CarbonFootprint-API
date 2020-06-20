const winston = require('winston');
const Sentry = require('winston-sentry');

const Logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false,
    }),
    new winston.transports.File({ level: 'debug', filename: 'dev.log' }),
    new Sentry({
      level: 'error',
      dsn: `${process.env.SENTRY_DSN}`
  })
  ],
});

module.exports = Logger;
