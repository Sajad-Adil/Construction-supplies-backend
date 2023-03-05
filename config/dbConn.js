const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/',
        );
    } catch (err) {
        console.error(err);
    }
}
module.exports = connectDB;

