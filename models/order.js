const mongoose = require('mongoose');
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    storeId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'store', 
        require: true },
    items: [{
        productId: { type: mongoose.Types.ObjectId, 
            ref: 'product', 
            require: true },

        quantity: { type: Number, 
            require: true },
    }],
    totalPrice: {  
        type: Number, 
        require: true },

    status: {
        type: String,
        default: "pending"
    }
},
    { 
        timestamps: true 
    });

function validateOrder(order) {
    const schema = {

        userID: Joi.objectId().required(),
        storeID: Joi.objectId().required(),
        totalPrice: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
    }
    
return Joi.validate(order, schema);
}
module.exports = mongoose.model('Order', OrderSchema);
exports.validate = validateOrder;