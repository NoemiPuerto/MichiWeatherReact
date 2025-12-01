const db = require("../config/db");

const crearUsuario = (nombre, email, password) => {
  return db("usuarios").insert({ nombre, email, password });
};

const obtenerUsuarioPorEmail = (email) => {
  return db("usuarios").where({ email }).first();
};

module.exports = { crearUsuario, obtenerUsuarioPorEmail };
