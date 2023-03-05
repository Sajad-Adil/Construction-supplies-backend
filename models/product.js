const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema =  new Schema({
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
        
    },
    storeID: { 
        type: Schema.Types.ObjectId,
        ref: 'store', 
        require: true },
    categoryID: { 
            type: Schema.Types.ObjectId, 
            ref: 'category', 
            require: true },
    price: {
        type: Number,
        require: true
    },
    stockQuantity: { 
        type: Number, 
        require: true }
    });


ProductSchema.index({description: 'text', title: 'text'});
module.exports = mongoose.model('Product', ProductSchema);
