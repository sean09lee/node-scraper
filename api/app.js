const createError = require('http-errors');
const express = require('express')
const path = require("path");
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const filesRouter = require('./routes/files');

// declare 10 sites we want to scrape
const sites = [
    'https://www.sitepoint.com',
    'https://www.google.com',
    'https://www.microsoft.com/en-us/',
    'https://firebase.google.com/',
    'https://www.agency73.com/',
    'https://nodejs.org/en/',
    'https://www.chess.com/',
    'https://material.io/',
    'https://swagger.io/',
    'https://developers.google.com/web/tools/lighthouse/'
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/files', filesRouter);

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

module.exports = app;
