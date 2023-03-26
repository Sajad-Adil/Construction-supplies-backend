const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

function validateStore(store) {

    const schema = Joi.object({
        ownerID: Joi.objectId().required(),
        name: Joi.string()
        .min(2)
        .max(255)
        .required(),
        phoneNumber: Joi.string()
        .pattern(/^07[0-9]{9}$/, 'numbers')
        .required(),
        city: Joi.string(),
        district: Joi.string(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required()
    })
    
return schema.validate(store);
}
module.exports = { validateStore };