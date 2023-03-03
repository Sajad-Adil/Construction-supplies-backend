const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

function validateUser(user) {

    const schema = Joi.object({
        phoneNumber: Joi.string()
        .min(2)
        .max(30)
        .required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        name: Joi.string().min(2).max(30).required(),
        password: Joi.string().min(8).required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
        city: Joi.string(),
        district: Joi.string(),
        roles: Joi.string()
    })
    
return schema.validate(user);
}
module.exports = { validateUser };