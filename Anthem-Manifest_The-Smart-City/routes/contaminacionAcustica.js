var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

/* GET all contaminacionAcustica */
router.get('/', async (req, res) => {
    try {
        // Realiza la consulta para obtener toda la contaminacion acustica
        const contaminacionAcustica = await db.collection("CIUDAD_CONTAMINACIONACUSTICA").find({}).toArray();
        // Envía los resultados como respuesta
        res.json(contaminacionAcustica);      
    } catch (error) {
        // Maneja los errores y envía una respuesta de error
        res.status(500).json({ error: 'Error al obtener la contaminacion acustica' });
    }
});

/* GET an contaminacionAcustica by id */
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const contaminacionAcustica = await db.collection("CIUDAD_CONTAMINACIONACUSTICA").findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json({contaminacionAcustica})
});

module.exports = router;