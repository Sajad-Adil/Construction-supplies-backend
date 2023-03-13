const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const handleLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) return res.status(400).json({ 'message': 'Phone number and password are required.' });

    const foundUser = await User.findOne({ phoneNumber: phoneNumber }).exec();
    if (!foundUser) return res.sendStatus(401).json({'message': 'error num 1' }); //Unauthorized 
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "phoneNumber": foundUser.phoneNumber,
                    "userId": foundUser._id,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "phoneNumber": foundUser.phoneNumber },
            process.env.REFRESH_TOKEN_SECRET.toString(),
        
            { expiresIn: '1d' }
        );
            
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });// set secure

        res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }};


module.exports = { handleLogin };
