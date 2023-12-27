var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require('dotenv').config();
var debug = require('debug')('SmartCity:server');

const db = mongoose.connection;

/* GET all asignacionPatinetes */
router.get('/', async (req, res) => {
    try {
        // Realiza la consulta para obtener toda la asignacion de patinetes
        const asignacionPatinetes = await db.collection("CIUDAD_ASIGNACIONPATINETES").find({}).toArray();
        // Envía los resultados como respuesta
        res.json(asignacionPatinetes);      
    } catch (error) {
        // Maneja los errores y envía una respuesta de error
        res.status(500).json({ error: 'Error al obtener la asignacion de patinetes' });
    }
});

/* GET an asignacionPatinetes by id */
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const asignacionPatinetes = await db.collection("CIUDAD_ASIGNACIONPATINETES").findOne({_id: new mongoose.Types.ObjectId(id)});
    res.json({asignacionPatinetes})
});

/* GET an asignacionPatinetes by BARRIO */
router.get("/barrio/:name", async function (req, res) {
    const name = req.params.name.toUpperCase();
    console.log(name);
    const asignacionPatinetes = await db.collection("CIUDAD_ASIGNACIONPATINETES").find({BARRIO: new RegExp(name, 'i')}).toArray();
    if (asignacionPatinetes.length) {
        res.json({asignacionPatinetes})
    } else {
        res.status(404).send("Sorry, no items found!");
    }
});

/* PATCH an asignacionPatinetes by id */
router.patch("/:_id", async function (req, res) {
    const id = req.params._id;
    const newTaxifyValue = req.body.Taxify;

    const result = await db.collection("CIUDAD_ASIGNACIONPATINETES").findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { Taxify: newTaxifyValue } },
        { new: true }
    );

    if (result) {
        res.json(result);
    } else {
        res.status(404).send("Document with the given id was not found");
    }
});

module.exports = router;
