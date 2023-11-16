const mongoose = require('mongoose');

const ciudadAccidentalidadSchema = new mongoose.Schema({
  num_expediente: String,
  fecha: String,
  hora: String,
  localizacion: String,
  numero: Number,
  cod_distrito: Number,
  distrito: String,
  tipo_accidente: String,
  estado_meteorologico: String,
  tipo_vehiculo: String,
  tipo_persona: String,
  rango_edad: String,
  sexo: String,
  cod_lesividad: Number,
  lesividad: String,
  coordenada_x_utm: String,
  coordenada_y_utm: String,
  positiva_alcohol: String,
  positiva_droga: String,
});

const CiudadAccidentalidad = mongoose.model('CiudadAccidentalidad', ciudadAccidentalidadSchema);

module.exports = CiudadAccidentalidad;