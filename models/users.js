const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePicture: {
        type: String
    },
    fullName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
        
    },
  
    address: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userType:{
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);