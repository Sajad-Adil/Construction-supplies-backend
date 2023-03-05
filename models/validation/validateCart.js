const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

function validateCart(cart) {

    const schema = Joi.object({
    productId: Joi.objectId().required(),
    quantity: Joi.number().min(1)

    })
    
return schema.validate(cart);
}
module.exports = { validateCart };