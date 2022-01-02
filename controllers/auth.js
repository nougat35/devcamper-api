const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    const token = user.getSignedJWT();

    res.status(200).json({
        debug: true,
        success: true,
        data: user,
        token,
    });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.slice(authHeader.indexOf(' ') + 1);
    // if(jwt.verify(bearerToken, process.env.JWT_SECRET) != )

    const user = await User.findOne({ email: email }).select('email password');

    const isPasswordMatch = user.matchPassword(password);

    res.status(200).json({
        email,
        password,
        isPasswordMatch,
    });
});
