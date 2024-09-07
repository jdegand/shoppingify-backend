const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;  // match in frontend code
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401); // Unauthorized 

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {

        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "_id": foundUser._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        );
        const refreshToken = jwt.sign(
            { "_id": foundUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.json({ accessToken, id: foundUser._id });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };