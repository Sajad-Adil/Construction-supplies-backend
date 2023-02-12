const mongoose = require('mongoose');
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const userSchema = new mongoose.Schema({
    email: { type: String,
        require: true,
        unique: true ,
        lowercase: true},

	password: { 
        type: String,
        require: true },

    phoneNumber: {
        type: String,
        require: true,
        unique: true},

	name: { 
        type: String,
        require: true },

    location: [   
        {latitude: 
            { type: Number,
            require: true },
        longitude: 
        { type: Number,
        require: true },
        city: string,
        district: string
    }],

    role: { 
        type: String, 
        require: true, 
        default: 'user' },

    timestamps: true 
    
})

function validateUser(user) {
const schema = {
    name: Joi.string()
    .min(2)
    .max(50)
    .required(),
    email: Joi.string()
    .min(1)
    .max(255)
    .required()
    .email(),
    password: Joi.string()
    .min(8)
    .max(255)
    .required()
    };

    return Joi.validate(user, schema);
}

exports.validate = validateUser;
module.exports = mongoose.model('User', userSchema);
