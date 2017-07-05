'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var pug = require('pug');
var mongoose = require('mongoose');

var app = express();

// set our port
app.set('port', process.env.PORT || 5000);

//set up app to use pug templates
app.set('view engine', 'pug')

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
//app.use(express.static('/public'));
app.set('views', 'src/public');

// set up the database connections
var mongoDB = 'mongodb://127.0.0.1/27017';
mongoose.connect(mongoDB);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// log successful connection to the database
db.once('open', function() {
  console.log('Database connections successfully established.')
});


app.get('/', function (req, res) {
  res.render('index')
})
app.use('/error', express.static('public/error.pug'));


// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
  	title: 'Error',
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
