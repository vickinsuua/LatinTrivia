var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var apiversion = '/api/v1';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/questions');
var verificationRouter = require('./routes/verifications');
var reportRouter = require('./routes/report');
var gameRouter = require('./routes/games');
var settingRouter = require('./routes/settings');
var categoryRouter = require('./routes/categorys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(apiversion+'/user', usersRouter);
app.use(apiversion+'/question', questionRouter);
app.use(apiversion+'/verification', verificationRouter);
app.use(apiversion+'/report', reportRouter);
app.use(apiversion+'/game', gameRouter);
app.use(apiversion+'/setting', settingRouter);
app.use(apiversion+'/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.use('/uploads',express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/app', { userMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = app;
