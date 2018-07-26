const winston = require('winston');

const Logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false
    }),
    new winston.transports.File({level: 'debug',filename: 'dev.log'}),
  ],
});

module.exports = Logger;