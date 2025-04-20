const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

const register = async (req,res) => {
    const{username,password,role} = req.body;
};

const login = async (req,res) => {
    const{username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({message:"Please provide username and password"});
    }
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"Invalid username or password"});
        }
        if(await bcrypt.compare(password,user.password)){
            token = jwt.sign({
                id:user._id,role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
         );
            res.status(200).json({
                token:token
            });
        }else{
            res.status(400).json({message:"Invalid password"});
        }

    }
    catch(err){
        res.status(500).json({message:"Internal server error"});
    }
};

module.exports ={
    register,
    login,
};