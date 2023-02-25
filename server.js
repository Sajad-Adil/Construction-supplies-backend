require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter= require('./routes/userRouter')
const connectDB = require('./config/dbConn')
const registerRouter = require('./routes/registerRouter');
const { request } = require('express');
const verifyJWT = require('./middlewares/verifyJWT');
const refreshToken = require('./routes/refresh')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use("/api/register", registerRouter);


connectDB();

app.listen(process.env.PORT || 5000, () => {
        console.log('app is listening on port', process.env.PORT || 5000)
})

