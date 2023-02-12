const mongoose = require('mongoose');
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true
    },
    storeID: { 
        type: mongoose.Types.ObjectId, 
        ref: 'store', 
        require: true },
    categoryID: { 
        type: mongoose.Types.ObjectId, 
        ref: 'category', 
        require: true },
    price: {
        type: Number,
        require: true
    },
    stockQuantity: { 
        type: Number, 
        require: true },

    timestamps: true 
    });


function validateProduct(product) {
    const schema = {
        name: Joi.string()
        .min(2)
        .max(255)
        .required(),
        description: Joi.string().required(),
        storeID: Joi.objectId().required(),
        categoryID: Joi.objectId().required(),
        price: Joi.number()
        .min(0)
        .required(),
        image: Joi.string().required(),
        stockQuantity: Joi.number()
        .min(0)
        .required(),
        
    }
    
return Joi.validate(product, schema);
}

module.exports = mongoose.model('Product', ProductSchema);
exports.validate = validateProduct