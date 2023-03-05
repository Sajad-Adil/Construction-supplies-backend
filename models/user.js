const mongoose = require('mongoose');


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

    roles: {
        User: {
            type: Number,
            default: 3000
            
        },
        Master: Number,
        Admin: Number
    },
    refreshToken: String
    }
)


userSchema.index({name: 'text'});
module.exports = User = mongoose.model('user', userSchema)



