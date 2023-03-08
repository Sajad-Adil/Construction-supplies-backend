const mongoose = require('mongoose')
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const Categoryschema = new mongoose.Schema({
    categoryName: { type: String, 
        require: true
    }
    })

module.exports = Category = mongoose.model('category', Categoryschema);



