const mongoose = require('mongoose');
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        require: true,
        unique: true},

    password: { 
        type: String,
        require: true },
    email: { type: String,
        unique: true ,
        lowercase: true},

    name: { 
        type: String,
        require: true },
        
    latitude: {type: Number},
    longitude: {type: Number},
    city: String,
    district: String,

    role: {
        type: String,
        require: true,
        default: 'user' }
    }
)


module.exports = User = mongoose.model('user', userSchema)


