var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

/* GET all callejero */
router.get('/', async (req, res) => {
    try {
        // Realiza la consulta para obtener todo el callejero
        const callejero = await db.collection("CIUDAD_CALLEJERO").find({}).toArray();
        // Envía los resultados como respuesta
        res.json(callejero);      
    } catch (error) {
        // Maneja los errores y envía una respuesta de error
        res.status(500).json({ error: 'Error al obtener el callejero' });
    }
});

/* GET an callejero by id */
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const callejero = await db.collection("CIUDAD_CALLEJERO").findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json({callejero})
});

/* GET an callejero by Codigo_de_numero */
router.get("/codigo_de_numero/:num", async function (req, res) {
    const num = parseInt(req.params.num, 10);
    console.log(num);
    const callejero = await db.collection("CIUDAD_CALLEJERO").find({Codigo_de_numero: num}).toArray();
    if (callejero.length) {
        res.json({callejero});
    } else {
        res.status(404).send("Sorry, no items found!");
    }
});

/* GET an callejero by Codigo_de_carril */
router.get("/codigo_de_carril/:num", async function (req, res) {
    const num = parseInt(req.params.num, 10);
    console.log(num);
    const callejero = await db.collection("CIUDAD_CALLEJERO").find({Codigo_de_carril: num}).toArray();
    if (callejero.length) {
        res.json({callejero});
    } else {
        res.status(404).send("Sorry, no items found!");
    }
});

module.exports = router;