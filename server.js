const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter= require('./routes/userRouter')
const storeRouter = require('./routes/stroreRouter')
const productRouter = require('./routes/productRouter')
const orderRouter = require('./routes/orderRouter')

app.use("/api/store", userRouter)
app.use("/api/store", storeRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)


mongoose.connect("mongodb://localhost:5000/construction-supplies")
.then(() => {
    console.log("Successfully connected to the database...");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.listen(process.env.PORT || 3000, () => {
        console.log('app is listening on port', process.env.PORT || 3000)
    })