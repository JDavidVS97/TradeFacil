const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({

    email:{
        type: String,
        required:[true,"Porfavor ingrese un correo valido"],
        validate:{
            validator: (val)=> /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
            message: "Porfavor ingrese un correo valido",
        },
        unique:true
    },
    password:{
        type: String,
        required: [true,"Porfavor Ingrese una contraseña que tenga por lo menos 8 caracteres"],
        validate:{
            validator: (val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(val),
            message: "Porfavor Ingrese una contraseña que tenga por lo menos 8 caracteres",
        }
    }

},{timestamps:true,versionKey:false});

UserSchema.plugin(uniqueValidator,{message:"Este correo ya esta en uso"});

UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword;
    })
    .set(function(value) {
        this._confirmPassword = value;
    });

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'La contraseña no coincide');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = new mongoose.model("User",UserSchema);
module.exports = User;