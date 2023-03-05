const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Types.ObjectId, 
            ref: 'user', 
            require: true,
            },

        items: [
            {
            productId: { 
                type: mongoose.Types.ObjectId, 
                ref: 'product', 
                require: true },

		quantity: { 
                type: Number, 
                min: 1, default: 1, 
                require: true },
        }],

        createdAt:     {      type: Date,
    default: Date.now} 
    },

    
);

module.exports = Cart = mongoose.model('Cart', CartSchema);
