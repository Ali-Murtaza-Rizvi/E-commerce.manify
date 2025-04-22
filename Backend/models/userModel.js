const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,     
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema) || mongoose.model.Users

module.exports = User;