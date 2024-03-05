const Producto= require("../models/producto.models");



module.exports.getProducto=async(req,res)=>{
    try {
        const producto= await Producto.find();
        res.status(200);
        res.json(producto);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.getProductoById=async(req,res)=>{
    try {
        const foundProducto=await Producto.findById(req.params.id);
        res.status(200);
        res.json(foundProducto);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.createProducto=async(req,res)=>{
    try {
        const newProducto=await Producto.create(req.body);
        res.status(201);
        res.json(newProducto);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.updateProducto=async(req,res)=>{
    try {
        const updateProducto=await Producto.findOneAndUpdate({_id: req.params.id},req.body,{new:true});
        res.status(200);
        res.json(updateProducto);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.deleteProducto=async(req,res)=>{
    try {
        const deletedProducto=await Producto.deleteOne({_id:req.params.id});
        res.status(200);
        res.json(deletedProducto);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};