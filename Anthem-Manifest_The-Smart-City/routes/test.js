var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

/* GET all accidents */
router.get('/', async (req, res) => {
  try {
    // Realiza la consulta para obtener todos los accidentes
    const accidentes = await db.collection("CIUDAD_ACCIDENTALIDAD").find({}).toArray();
        // Envía los resultados como respuesta
        res.json(accidentes);
        
  } catch (error) {
    // Maneja los errores y envía una respuesta de error
    res.status(500).json({ error: 'Error al obtener los accidentes' });
  }
});

module.exports = router;
