const Sentry = require('@sentry/browser');

Sentry.init({dsn: `${process.env.REACT_APP_SENTRY_DSN}` });

const sendMessage = ( msg ) => {
    Sentry.captureMessage(msg);
}

const sendMessageExtra = ( msg, obj ) => {
    Sentry.captureMessage(msg, {extra: obj});
}

const setUserName = ( name ) => {
    Sentry.setUser({ username: name })
}

module.exports = {
    sendMessage,
    setUserName,
    sendMessageExtra
};
