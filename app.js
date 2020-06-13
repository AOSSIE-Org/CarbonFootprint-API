require('dotenv').config();
require('module-alias/register');

// get required dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
// eslint-disable-next-line import/no-unresolved
const customErrorFunctions = require('@framework/CustomRouterFunctions');
const helmet = require('helmet');
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
const cors = require('cors');

const Sentry = require('@sentry/node');

Sentry.init({ dsn: '' });

// database setup
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// connect to the database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});

// get different routes required
const index = require('./routes/index');
const emissions = require('./api/v1/routes/emissionRoutes');
const suggestedData = require('./routes/suggestedData');
const auth = require('./api/auth/routes/apikeyRoute');
const individualEmission = require('./api/user/routes/dailyEmissionRoute');
const swagger = require('./api/v1/routes/swagger');

const Auth = require('./api/auth/controllers/authController');

const app = express();

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const whitelist = process.env.WHITELISTED_DOMAINS.split(','); // adding the whitelist urls in the array
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS Support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, access-key',
  );
  next();
});

app.use(favicon(path.join(__dirname, 'client/public/img', 'favicon.png')));

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(helmet());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: false,
    jwksRequestsPerMinute: 500,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
});

// Add custom router functions
app.use(customErrorFunctions);

// routes for api v1
const v1 = express.Router();
v1.use(Auth.verifyApiKey);
v1.use('/', emissions);

// route for documentation
app.use('/api/docs', swagger);

// routes for authorization key generation
const authroute = express.Router();
authroute.use(jwtCheck);
authroute.use('/', auth);

// route for user functions
const userRoute = express.Router();
userRoute.use(jwtCheck);
userRoute.use('/', individualEmission);
app.use('/user', userRoute);

app.use('/suggestedData', suggestedData);

// Use v1 router for all the API requests adhering to version 1
app.use('/v1', v1);

// Use authroute for the requests regarding user authentication
app.use('/auth', authroute);

// show the API dashboard
app.use('/', index);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;