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

/* GET an accident by id */
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const accidentes = await db.collection("CIUDAD_ACCIDENTALIDAD").findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json({accidentes})
});

/* GET an accident by location */
router.get("/localizacion/:name", async function (req, res) {
    const name = req.params.name.toUpperCase();
    console.log(name);
  
    const forbiddenWords = ["DE", "CALL", "AVDA", "C/", "CALL.", "AVDA."];
    if (forbiddenWords.some(word => word === name)) {
        res.status(404).send("Sorry the word is not allowed!");
    }
    else {
        const accidentes = await db.collection("CIUDAD_ACCIDENTALIDAD").find({localizacion: new RegExp(name, 'i')}).toArray();
        if (accidentes.length) {
            res.json({accidentes})
        } else {
            res.status(404).send("Sorry, no items found!");
        }
    }
});

module.exports = router;
