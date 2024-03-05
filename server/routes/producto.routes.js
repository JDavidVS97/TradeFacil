const express= require('express');
const router= express.Router();
const {authenticate} = require('../config/jwt.config');

const productoController=require('../controllers/producto.controllers')

router.post("",authenticate,productoController.createProducto);
router.get("",authenticate,productoController.getProducto);
router.get("/:id",authenticate,productoController.getProductoById);
router.put("/:id",authenticate,productoController.updateProducto);
router.delete("/:id",authenticate,productoController.deleteProducto);

module.exports=router;