const mongoose = require("mongoose")
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const Store = new mongoose.Schema({
    ownerID: { 
        type: mongoose.Types.ObjectId,
        ref: 'user',
        require: true },

    name: { 
        type: String, 
        require: true, 
        unique: true },
    location: [{
        latitude: { 
            type: Number,
            require: true },
        longitude: { 
            type: Number,
            require: true },
        city: string,
        district: string
    }],
    timestamps: true
})

function validateStore(store) {
    const schema = {
        name: Joi.string()
        .min(2)
        .max(255)
        .required(),
        ownerID: Joi.objectId().required()
    }
    
return Joi.validate(store, schema);
}
module.exports = mongoose.model('store', Store);
exports.validate = validateStore;