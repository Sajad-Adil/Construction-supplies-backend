require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn')
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');
const verifyJWT = require('./middlewares/verifyJWT');
const refreshToken = require('./routes/refreshRouter')
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter')
app.use(express.json())
app.use(cookieParser())
app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);
app.use("/api/refresh",refreshToken );

app.use(verifyJWT);
app.use("/api/user", userRouter);


connectDB();

app.listen(process.env.PORT || 5000, () => {
        console.log('app is listening on port', process.env.PORT || 5000)
})


