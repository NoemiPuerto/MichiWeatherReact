const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { crearUsuario, obtenerUsuarioPorEmail } = require("../models/usuarioModel");
const { JWT_SECRET } = require("../config/jwt");

// Registro
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si usuario existe
    const userExist = await obtenerUsuarioPorEmail(email);
    if (userExist) return res.status(400).json({ message: "Usuario ya registrado" });

    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10);

    await crearUsuario(nombre, email, hash);

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await obtenerUsuarioPorEmail(email);
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, nombre: user.nombre, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
  }
};

module.exports = { register, login };
