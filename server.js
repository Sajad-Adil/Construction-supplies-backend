require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn')
const registerRouter = require('./routes/registerRouter');
//const { request } = require('express');
const authRouter = require('./routes/authRouter');
const verifyJWT = require('./middlewares/verifyJWT');
const refreshToken = require('./routes/refreshRouter');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const searchRouter = require('./routes/searchRouter');
const storeRouter = require('./routes/storeRouter');
const cartRouter = require('./routes/cartRouter');
const verifyRoles = require('./middlewares/verifyRoles');
const productRouter = require('./routes/productRouter');

app.use(express.json())
app.use(cookieParser())
app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);
app.use("/api/refresh",refreshToken );


//app.use('/logout', handleLogout);
//app.use(verifyJWT);
//app.use(verifyRoles);
app.use("/api/cart",cartRouter);
app.use("/api/user", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/store",storeRouter);
app.use("/api/product",productRouter);


connectDB();

app.listen(process.env.PORT || 5000, () => {
        console.log('app is listening on port', process.env.PORT || 5000)
})


