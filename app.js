require('dotenv').config();
require('module-alias/register');

// get required dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var customErrorFunctions = require('@framework/CustomRouterFunctions');
var helmet = require('helmet');
var Logger = require('@framework/Logger');

// database setup
var mongoose = require('mongoose');
// connect to the database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useMongoClient: true });

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Connection to database established successfully');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error(`Error connecting to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Database disconnected');
});


// get different routes required
var index = require('./routes/index');
var emissions = require('./api/v1/routes/emissionRoutes');
var suggestedData = require('./routes/suggestedData');
var auth = require('./api/auth/routes/apikeyRoute');

const Auth = require('./api/auth/controllers/authController');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS Support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-key");
  next();
});

app.use(favicon(path.join(__dirname, 'client/public/img', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(helmet());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksRequestsPerMinute: 500,
        jwksUri: process.env.AUTH0_JWKS_URI
    }),
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256'],
});

// Add custom router functions
app.use(customErrorFunctions);

//routes for api v1
var v1 = express.Router();
v1.use(Auth.verifyApiKey);
v1.use('/', emissions);

//routes for authorization key generation
var authroute = express.Router();
authroute.use(jwtCheck);
authroute.use('/', auth);

app.use('/suggestedData', suggestedData);

// Use v1 router for all the API requests adhering to version 1
app.use('/v1', v1);

// Use authroute for the requests regarding user authentication
app.use('/auth', authroute);

// show the API dashboard
app.use('/', index);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
