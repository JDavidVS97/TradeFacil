const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Importa tu modelo de usuario

// Middleware de autenticación
module.exports.idUser= async (req, res, next) => {
    try {
        // Obtener el token de la cabecera de autorización
        const token = req.headers.authorization.split(' ')[1];

        // Verificar si hay un token
        if (!token) {
            return res.status(401).json({ success: false, message: 'No se proporcionó un token de autenticación' });
        }

        // Verificar el token y decodificarlo para obtener los datos del usuario
        const decodedToken = jwt.verify(token, 'secreto'); // Cambia 'secreto' por tu propia clave secreta

        // Buscar al usuario en la base de datos utilizando el ID del usuario del token
        const usuario = await User.findById(decodedToken._id);

        // Verificar si se encontró el usuario
        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Agregar el usuario autenticado al objeto de solicitud
        req.user = usuario;

        // Llamar a next() para continuar con el siguiente middleware o controlador
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(401).json({ success: false, message: 'Error de autenticación' });
    }
};

