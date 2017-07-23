// get required dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// database setup
var mongoose = require('mongoose');
// get the database configuration file
try {
	var config = require('./config.json');
}
catch(e){
	console.log(`Database configuration file "config.json" is missing.`);
	process.exit(1);
}
var db = config.database;

// connect to the database
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.dbname}`);

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Connection to database established successfully');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to database: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

// get different routes required
var index = require('./routes/index');
var emissions = require('./api/v1/routes/emissionRoutes');
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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(favicon(path.join(__dirname, 'client/public/img', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const auth0 = config.auth0;
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksRequestsPerMinute: 500,
        jwksUri: auth0.jwksUri
    }),
    issuer: auth0.issuer,
    algorithms: ['RS256'],
});

//routes for api v1
var v1 = express.Router();
v1.use(Auth.verifyApiKey);
v1.use('/', emissions);

//routes for authorization key generation
var authroute = express.Router();
authroute.use(jwtCheck);
authroute.use('/', auth);

// Use v1 router for all the API requests adhering to version 1
app.use('/v1', v1);

// Use authroute for the requests regarding user authentication
app.use('/auth', authroute);

// show the API dashboard
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
