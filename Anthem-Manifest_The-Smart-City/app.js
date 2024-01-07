var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var mongoose = require('mongoose');
var debug = require('debug')('SmartCity:server');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accidentalidadRouter = require('./routes/accidentalidad');
var callejeroRouter = require('./routes/callejero');
var contaminacionAcusticaRouter = require('./routes/contaminacionAcustica');
var bicicletasDisponibilidadRouter = require('./routes/bicicletasDisponibilidad');
var bicicletasAforoRouter = require('./routes/bicicletasAforo');
var asignacionPatinetesRouter = require('./routes/asignacionPatinetes');

var app = express();

var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// MongoDB Atlas DB cluster connection
mongoose
  .connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => debug("MongoDB Atlas DataBase connection successful"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/accidentalidad', accidentalidadRouter);
app.use('/callejero', callejeroRouter);
app.use('/contaminacionAcustica', contaminacionAcusticaRouter);
app.use('/bicicletasDisponibilidad', bicicletasDisponibilidadRouter);
app.use('/bicicletasAforo', bicicletasAforoRouter);
app.use('/asignacionPatinetes', asignacionPatinetesRouter);

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
