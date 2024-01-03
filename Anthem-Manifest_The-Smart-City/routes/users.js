var express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var router = express.Router();
// Token generation imports
const dotenv = require('dotenv');
// get config vars
dotenv.config();

var debug = require("debug")("anthem-manifest-the-smart-city:server");

//Models
var User = require("../models/User.js");

var db = mongoose.connection;

function tokenVerify (req, res, next) {
    var authHeader=req.get('authorization');
    const retrievedToken = authHeader.split(' ')[1];
    
    if (!retrievedToken) {
        res.status(401).send({
            ok: false,
            message: "Token inválido"
        })
    }else{       
        jwt.verify(retrievedToken, process.env.TOKEN_SECRET,  function (err, retrievedToken) {
            if (err) {
                res.status(401).send({
                    ok: false,
                    message: "Token inválido"
                });
            } else {
                next();
            }
        });
    }
}

router.get("/secure", tokenVerify, 
function (req, res, next) {
    debug("Acceso seguro con token a los usuarios");
    User.find()
    .then(users => res.status(200)
    .json(users)).catch(err => res.status(500).send(err))
});

// GET de un único usuario por su Id
router.get("/secure/:id", tokenVerify, function (req, res, next) {
    debug("Acceso seguro con token a un usuario");
    User.findById(req.params.id)
    .then(userinfo => res.status(200).json(userinfo))
    .catch(err => res.status(500).send(err));
});

// POST de un nuevo usuario
router.post("/", function (req, res, next) {
    User.create(req.body)
    .then(() => res.sendStatus(200).json(userinfo))
    .catch(err => res.status(500).send(err));
});

// POST de un nuevo usuario
router.post("/secure", tokenVerify, function (req, res, next) {
    debug("Creación de un usuario segura con token");
    User.create(req.body)
    .then(userinfo => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

router.put("/secure/:id", tokenVerify, function (req, res, next) {
    debug("Modificación segura de un usuario con token");
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(userinfo => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// DELETE de un usuario existente identificado por su Id
router.delete("/secure/:id", tokenVerify, function (req, res, next) {
    debug("Borrado seguro de un usuario con token");
    User.findByIdAndDelete(req.params.id)
    .then(userinfo => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

//TOKEN_SECRET = 'unaclavesecretabuenaParagenerarTokens1234' va dentro de .env
router.post("/signin", 
function (req, res, next) {
    debug("login");
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user != null) {
                debug("El usuario existe");
                user.comparePassword(req.body.password, 
                     function (err, isMatch) {
                          if (err) res.status(500).send("¡Error comprobando el password!");
                          if (isMatch){   
                            next();//pasamos a generar el token
                          }else
                                res.status(401).send({
                                   message: "Password no coincide"
                          });    
            })}
            else { //El usuario NO existe en la base de datos
                res.status(401).send({
                    message: "Usuario no existe"
                });
            }
        })
        .catch(() =>  res.status(500).send("¡Error comprobando el usuario!"))
},
function (req, res, next) {
    debug("... generando token");
    jwt.sign({username: req.body.username},process.env.TOKEN_SECRET, {expiresIn: 3600 // expira en 1 hora...
    }, function(err, generatedToken) {
        if (err) res.status(500).send("¡Error generando token de autenticación");
        else res.status(200).send({
            message: generatedToken
       });
    });
});

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
      // Realiza la consulta para obtener todos los accidentes
      const usuarios = await db.collection("users").find({}).toArray();
          // Envía los resultados como respuesta
          res.json(usuarios);
          
    } catch (error) {
      // Maneja los errores y envía una respuesta de error
      res.status(500).json({ error: 'Error al obtener los accidentes' });
    }
  });

module.exports = router;