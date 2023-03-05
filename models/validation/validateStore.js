const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

function validateStore(store) {

    const schema = Joi.object({
        ownerID: Joi.objectId().required(),
        name: Joi.string()
        .min(2)
        .max(255)
        .required(),
        city: Joi.string(),
        district: Joi.string(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required()
    })
    
return schema.validate(store);
}
module.exports = { validateStore };