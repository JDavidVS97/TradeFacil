const mongoose = require("mongoose");


const ProductoSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String
    },
    imageUrl: { 
        type: String,
        default: 'https://codigogenesis.com/genesis/2022/04/imagen-placeholder-por-defecto-WooCommerce.png'// Opcional: puedes proporcionar una URL predeterminada si no tienes una imagen para todos los productos
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true,versionKey:false});

const Producto = new mongoose.model("Producto",ProductoSchema);

module.exports = Producto;