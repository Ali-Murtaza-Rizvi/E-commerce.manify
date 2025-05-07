const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

const register = async (req,res) => {
    const{email,username,password,isAdmin} = req.body;
    if(!email || !username || !password){
        console.log(username,password,email);
        return res.status(400).json({message:"Please provide email, username and password"});
    }
    try{
        existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        hashedPass = await bcrypt.hash(password,salt);
        newUSer = new User({
            email:email,
            username:username,
            password:hashedPass,
            role:isAdmin ? "admin" : "user"
        });
        newUSer = await newUSer.save();
        if(!newUSer){
            return res.status(400).json({message:"User not created"});
        }else{
            res.status(201).json({message:"User created successfully"});
        }
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
};

const login = async (req,res) => {
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password"});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid username or password"});
        }
        if(await bcrypt.compare(password,user.password)){
            token = jwt.sign({
                id:user._id,
                role:user.role,
                username:user.username,
                email:user.email
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