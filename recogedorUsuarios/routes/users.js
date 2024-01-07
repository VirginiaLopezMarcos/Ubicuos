const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
var debug = require('debug')('recogedorUsuarios:server');
const saltRounds = 10;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://VIRGINIALOPEZMARCOS:muVhxeDthxa408fU@cluster1.jprjpoe.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  debug("MongoDB Atlas DataBase connection successful");
}).catch(err => {
  debug('Error al conectarse a la base de datos:', err);
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const UserModel = mongoose.model('User', UserSchema);

router.get('/', async (req, res) => {
  axios.get('https://randomuser.me/api/?results=5')
  .then(response => {
    const usersFromAPI = response.data.results;
    const usersToSave = usersFromAPI.map(async user => {
    const username = `${user.name.first} ${user.name.last}`;

  // Buscar si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await UserModel.findOne({ username: username });
      if (existingUser) {
        // Por ejemplo, podrías generar un nuevo nombre de usuario
        username = `${username} ${Math.floor(Math.random() * 1000)}`;
      }
       // Hash the password
    const hashedPassword = await bcrypt.hash(user.login.password, saltRounds);
    console.log(`email: ${user.email}, contraseña: ${user.login.password}`);

      return {
        username: `${user.name.first} ${user.name.last}`,
        email:user.email,
        password: hashedPassword,
      };
      
    });
    // Generar un token para cada usuario
    usersToSave.forEach(user => {
    user.token = jwt.sign({ email: user.email }, 'calvesupersecretaparatoken1234567890');
  });
    Promise.all(usersToSave)
      .then(users => {
        UserModel.insertMany(users)
          .then(() => {
            debug('Datos almacenados en la base de datos');
            process.exit(0); // Cierra el programa
          })
          .catch(error => {
            debug('Error al insertar datos en la base de datos:', error);
            process.exit(1); // Cierra el programa con un código de error
          });
      })
      .catch(error => {
        debug('Error al procesar los usuarios:', error);
        process.exit(1); // Cierra el programa con un código de error

      });
  });
});

module.exports = router;
