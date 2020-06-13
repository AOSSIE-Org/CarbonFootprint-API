const Sentry = require('@sentry/browser');

Sentry.init({dsn: ""});

module.exports = Sentry;
