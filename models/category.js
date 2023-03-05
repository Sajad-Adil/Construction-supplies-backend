const mongoose = require('mongoose')
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const Category = new mongoose.Schema({
    categoryName: { type: String, 
        require: true, 
        unique: true },

    image: { 
        type: String, 
        require: false },
    createdAt: date.now
})

function validateCategory(category) {
    const schema = {
        name: Joi.string()
        .min(2)
        .max(255)
        .required(),
        description: Joi.string().required(),
        parent_id: Joi.objectId(),
        image: Joi.string(),
    }
    
return Joi.validate(category, schema);
}
module.exports = Category = mongoose.model('category', Category);
exports.validate = validateCategory;


