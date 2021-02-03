require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

// ส่วนของการใช้งาน router module ต่างๆ 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var f43exportsRouter = require('./routes/f43exports');
var personsRouter = require('./routes/persons');
var wscopipcusRouter = require('./routes/wscopipcus');
var drugsRouter = require('./routes/drugs');
var episRouter = require('./routes/epis');
var fromwscsRouter = require('./routes/fromwscs');
var towscsRouter = require('./routes/towscs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
  delimiter: '%'
}); //เพิ่มเข้ามา

app.use(logger('combined'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));


//เรียกใช้งาน Router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/f43exports', f43exportsRouter);
app.use('/persons', personsRouter);
app.use('/wscopipcus', wscopipcusRouter);
app.use('/drugs', drugsRouter);
app.use('/epis', episRouter);
app.use('/fromwscs', fromwscsRouter);
app.use('/towscs', towscsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;