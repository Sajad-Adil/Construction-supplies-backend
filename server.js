require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn')
const cors = require('cors');
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');
const verifyJWT = require('./middlewares/verifyJWT');
const refreshToken = require('./routes/refreshRouter')
const cookieParser = require('cookie-parser');
const handleLogout = require('./routes/logoutRouter')
const userRouter = require('./routes/userRouter')
const searchRouter = require('./routes/searchRouter')
const storeRouter = require('./routes/storeRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const productRouter = require('./routes/productRouter')
const categoryRouter = require('./routes/categoryRouter')
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/', require('./routes/root'));
app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);
app.use("/api/refresh",refreshToken );


app.use('/logout', handleLogout);
app.use("/api/search", searchRouter);
app.use("/api/product",productRouter);
app.use("/api/user", userRouter);
app.use("/api/store",storeRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/category",categoryRouter);


connectDB();

app.listen(process.env.PORT || 5000, () => {
        console.log('app is listening on port', process.env.PORT || 5000)
})


