const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://VIRGINIALOPEZMARCOS:muVhxeDthxa408fU@cluster1.jprjpoe.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch(err => {
  console.error('Error al conectarse a la base de datos:', err);
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
      // Generar un token para el email del usuario
      const emailToken = jwt.sign({ email: user.email }, 'unaclavesecretabuenaParagenerarTokens1234');
      return {
        username: `${user.name.first} ${user.name.last}`,
        email: emailToken, // Guarda el token en lugar del email
        password: user.login.password,
      };
      
    });
      
    Promise.all(usersToSave)
      .then(users => {
        UserModel.insertMany(users)
          .then(() => {
            console.log('Datos almacenados en la base de datos');
            process.exit(0); // Cierra el programa
          })
          .catch(error => {
            console.error('Error al insertar datos en la base de datos:', error);
            process.exit(1); // Cierra el programa con un código de error
          });
      })
      .catch(error => {
        console.error('Error al procesar los usuarios:', error);
        process.exit(1); // Cierra el programa con un código de error

      });
  });
});

module.exports = router;