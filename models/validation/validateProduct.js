const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

function validateProduct(product) {

    const schema = Joi.object({
        title: Joi.string()
        .min(2)
        .max(255)
        .required(),
        description: Joi.string(),
        storeID: Joi.objectId().required(),
        categoryID: Joi.objectId().required(),
        price: Joi.number()
        .min(0)
        .required(),
        image: Joi.string(),
        stockQuantity: Joi.number()
        .min(0)
        .required()
    })
    
return schema.validate(product);
}
module.exports = { validateProduct };