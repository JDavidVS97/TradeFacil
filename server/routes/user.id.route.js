const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/user.id.controller');



// Ruta protegida que requiere autenticación
router.post("/session",usuarioController.idUser);

module.exports = router;