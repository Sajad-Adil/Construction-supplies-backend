const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

function validateOrder(order) {

    const schema = Joi.object({
        storeId: Joi.objectId().required(),
        items: Joi.object().required(),
        totalPrice: Joi.number().required(),
        status: Joi.string()
    })
    
return schema.validate(order);
}
module.exports = { validateOrder };