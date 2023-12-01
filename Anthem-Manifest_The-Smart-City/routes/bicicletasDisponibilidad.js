var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

/* GET all bicicletasDisponibilidad */
router.get('/', async (req, res) => {
    try {
        // Realiza la consulta para obtener toda la disponibilidad de bicicletas
        const bicicletasDisponibilidad = await db.collection("CIUDAD_BICICLETADISPONIBILIDAD").find({}).toArray();
        // Envía los resultados como respuesta
        res.json(bicicletasDisponibilidad);      
    } catch (error) {
        // Maneja los errores y envía una respuesta de error
        res.status(500).json({ error: 'Error al obtener la disponibilidad de bicicletas' });
    }
});

/* GET an bicicletasDisponibilidad by id */
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const bicicletasDisponibilidad = await db.collection("CIUDAD_BICICLETADISPONIBILIDAD").findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json({bicicletasDisponibilidad})
});

module.exports = router;