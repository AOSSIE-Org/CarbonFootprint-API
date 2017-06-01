/////////////////////  EXPRESS //////////////////
//require our dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var percap = require('./routes/percap');

var vehicles = require('./footprintModels/vehicle');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/',(req,res,next)=>{
	input = {
		type:"mini",
		fuel:"P",
		gas:"co2e",
		resultIn:{
			distanceType : "miles",   // options available miles,kilometers,foot
			footprintType: "grams"  // pounds,kg,grams
		},
		distance:0.83
	}
	var v = new vehicles;
	v.getData(input).then((result)=>{
		console.log(result);
	}).catch(error => console.log(error));
	next(); 
},index);
app.use('/percap', percap);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('8080')

module.exports = app;
