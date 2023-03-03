const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
    ownerID: { 
        type: mongoose.Types.ObjectId,
        ref: 'user',
        require: true },

    name: { 
        type: String, 
        require: true, 
        unique: true },

        latitude: { 
            type: Number,
            require: true },
        longitude: { 
            type: Number,
            require: true },

        city: String,
        district: String

    
})


storeSchema.index({name: 'text'});
module.exports = Store = mongoose.model('store', storeSchema);

