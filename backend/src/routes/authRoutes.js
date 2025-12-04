const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");
const db = require("../config/db");

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Ruta protegida
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await db("usuarios").where("id", req.userId).first();
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({
      id: user.id,
      nombre: user.nombre,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
