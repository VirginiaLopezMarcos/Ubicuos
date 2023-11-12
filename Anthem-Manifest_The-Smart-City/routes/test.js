var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

router.get('/', (req, res, next) => {
  res.send('¡La conexión con MongoDB Atlas funciona correctamente!');
});

module.exports = router;
