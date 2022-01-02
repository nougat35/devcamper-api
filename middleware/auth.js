const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

exports.protect = asyncHandler(async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const bearerToken =
        authHeader && authHeader.slice(authHeader.indexOf(' ') + 1);

    if (!bearerToken) {
        return res.sendStatus(401);
    }

    jwt.verify(
        bearerToken,
        process.env.JWT_SECRET,
        async function (err, decoded) {
            if (err) {
                return res.sendStatus(401);
            }

            const user = await User.findById(decoded.id);
            console.log(user.id);
            req.user = user;
            next();
        }
    );
});

exports.authorize = function (roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(401);
        }
        next();
    };
};
