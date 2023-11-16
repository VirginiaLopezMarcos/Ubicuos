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
/*
router.get("/:id", function (req, res, next) {
  if (req.params.id == "652795df0f624cb62ba880b8") {
    debug("RECUPERA LOS DATOS: "); 
    debug(req.params.id);
    var user = {
      id: "652795df0f624cb62ba880b8",
      num_expediente: "2051S000006",
      fecha: "01/01/2051",
      hora: "5:05:00",
      localizacion: "CALL. EUGENIA DE MONTIJO, 60",
      poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      numero: 60,
      cod_distrito: 11,
      distrito: "CARABANCHEL",
      tipo_accidente: "Colisión lateral",
      estado_meteorológico: "Despejado",
      tipo_vehiculo: "Turismo",
      tipo_persona: "Pasajero",
      rango_edad: "De 45 a 49 años",
      sexo: "Hombre",
      cod_lesividad: 14,
      lesividad: "Sin asistencia sanitaria",
      coordenada_x_utm: "436672,459",
      coordenada_y_utm: "4470217,076",
      positiva_alcohol: "N",
      positiva_droga: null
    };
    res.json(user);
  } else res.status(404).send("Sorry, item not found!");
});*/
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const test = await db.collection("CIUDAD_ACCIDENTALIDAD").findOne({_id: new mongoose.Types.ObjectId(id)});
  res.json({test})
 });

 router.get("/localizacion/:name", async function (req, res) {
  const name = req.params.name;
  console.log(name);
  const tests = await db.collection("CIUDAD_ACCIDENTALIDAD").find({localizacion: name}).toArray();
  if (tests.length) {
    res.json({tests})
  } else {
    res.status(404).send("Sorry, no items found!");
  }
});

module.exports = router;
