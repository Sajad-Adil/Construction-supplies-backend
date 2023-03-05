const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.phoneNumber !== decoded.phoneNumber) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "phoneNumber": decoded.phoneNumber,
                        "userId": decoded._id,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                
                { expiresIn: '24h' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }