const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const indexRoute = require('./routes/index');
const applyRoute = require('./routes/apply');
const dotenv =require('dotenv');
const http = require('http');
var expressGoogleAnalytics = require('express-google-analytics');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
dotenv.config();

mongoose.connect(process.env.DBCONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () => console.log("DB Started"));





// Insert your Google Analytics Id, Shoule be something like 'UA-12345678-9'
var analytics = expressGoogleAnalytics('UA-140145916-1');
//Add to express before your routes
app.use(analytics);
app.use(helmet());

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit:'10mb' }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/file', express.static(path.join(__dirname, 'file')));

app.use('/', indexRoute);
app.use('/apply',applyRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);

const port=process.env.PORT||80;

server.listen(port, () => console.log("http start on port"+port))