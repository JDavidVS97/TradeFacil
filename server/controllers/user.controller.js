const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;





module.exports.CreateUser= async(req,res)=>{
    try {
        const newUser = await User.create(req.body);
        res.status(200);
        res.json(newUser);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

module.exports.updateUser= async(req,res)=>{
    try {
        const updatedUser = await User.findOneAndUpddate({_id: req.params.id},req.body,{new:true,runValidators:true});
        res.status(200);
        res.json(updatedUser);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}
module.exports.deleteUser=async(req,res)=>{
    try {
        const deletedUser=await User.deleteOne({_id:req.params.id});
        res.status(200);
        res.json(deletedUser);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

module.exports.getUser=async(req,res)=>{
    try {
        const user= await User.find();
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.getUserById=async(req,res)=>{
    try {
        const foundUser=await User.findById(req.params.id);
        res.status(200);
        res.json(foundUser);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};


module.exports.cookie = async(req,res)=>{
    try {
        res.cookie("mycookie","mydata",{httpOnly: true});
        res.json({message:"ok"})
    } catch (error) {
        res.json(error);
    }
}

module.exports.login = async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user===null){
            res.status(404);
            res.json({errors:{
                email:{
                    message:"Usuario no encontrado"
                }
            }});
            return;
        }
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword){
            res.status(400);
            res.json({errors:{
                password:{
                    message:"contraseña incorrecta"
                }
            }});
            return;
        }
        const newJWT = jwt.sign({
            _id: user._id
        }, secretKey,{expiresIn:'30m'});
        res.cookie("userToken",newJWT,{httpOnly: true});
        res.status(200);
        res.json({msg: "sesion iniciada"});
    } catch (error) {
        res.status(500);
        res.json({errors:{
            server:{
                message: error
            }
        }});
    }

}

module.exports.logout = async (req,res)=>{
    try {
        res.clearCookie('userToken');
        res.status(200);
        res.json({msg:"session cerrada"});
    } catch (error) {
        res.status(500);
        console.log(error)
        res.json({errors:{
            server:{
                message: error
            }
        }});
    }
}

