const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {

            const foundUser = await User.findById(decoded._id);

            if (err || foundUser.id !== decoded._id) return res.sendStatus(403);
            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": decoded._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' } 
            );
            res.json({ accessToken }) 
        }
    );
}

module.exports = { handleRefreshToken }