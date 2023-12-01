var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

/* GET all bicicletasAforo */
router.get('/', async (req, res) => {
    try {
        // Realiza la consulta para obtener todo el aforo de bicicletas
        const bicicletasAforo = await db.collection("CIUDAD_BICICLETASAFORO").find({}).toArray();
        // Envía los resultados como respuesta
        res.json(bicicletasAforo);      
    } catch (error) {
        // Maneja los errores y envía una respuesta de error
        res.status(500).json({ error: 'Error al obtener el aforo de bicicletas' });
    }
});

/* GET an bicicletasAforo by id */
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const bicicletasAforo = await db.collection("CIUDAD_BICICLETASAFORO").findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json({bicicletasAforo})
});

/* GET an bicicletasAforo by NOMBRE_VIAL */
router.get("/nombre_vial/:nombre", async function (req, res) {
    const name = req.params.nombre.toUpperCase();
    console.log(name);
  
    const forbiddenWords = ["DE", "CALLE", "AVENIDA", "PASEO"];
    if (forbiddenWords.some(word => word === name)) {
        res.status(404).send("Sorry the word is not allowed!");
    }
    else {
        const bicicletasAforo = await db.collection("CIUDAD_BICICLETASAFORO").find({NOMBRE_VIAL: new RegExp(name, 'i')}).toArray();
        if (bicicletasAforo.length) {
            res.json({bicicletasAforo})
        } else {
            res.status(404).send("Sorry, no items found!");
        }
    }
});

module.exports = router;