const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true
    },
    storeID: { 
        type: mongoose.Types.ObjectId, 
        ref: 'store', 
        require: true },
    categoryID: { 
        type: mongoose.Types.ObjectId, 
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


ProductSchema.index({title: 'text'});
module.exports = mongoose.model('Product', ProductSchema);