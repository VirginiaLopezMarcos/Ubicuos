require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

router.get('/', (req, res, next) => {
  res.send('¡La conexión con MongoDB Atlas funciona correctamente!');
});

module.exports = router;
