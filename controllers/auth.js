const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    await User.create({ name, email, password, role });

    res.status(200).json({
        success: true,
    });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select('email password');
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
        const token = user.getSignedJWT();
        const options = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60 * 60 * 24
            ),
            httpOnly: true,
        };

        if (process.env.mode === 'prod') {
            options.secure = true;
        }

        return res.status(200).cookie('token', token, options).json({
            success: true,
            token,
        });
    }

    res.sendStatus(401);
});

exports.logout = asyncHandler(async function (req, res, next) {
    res.status(200)
        .cookie('token', '', {
            httpOnly: true,
            expire: Date.now(0),
        })
        .json({
            success: true,
        });
});

exports.getMe = asyncHandler(async function (req, res, next) {
    const user = await User.findById(req.user.id);

    return res.status(200).json({
        success: true,
        user,
    });
});

exports.forgotPassword = asyncHandler(async function (req, res, next) {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({
            success: false,
        });
    }

    const resetToken = await user.generateResetPasswordToken();

    res.status(200).json({
        success: true,
        resetToken,
    });
});

exports.resetPassword = asyncHandler(async function (req, res, next) {
    const token = req.query['token'].toString();
    const hashedToken = crypto.createHash('SHA256').update(token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
    });

    const isTokenExpired =
        new Date(user.resetPasswordExpire).getTime() < Date.now();

    if (!isTokenExpired) {
        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
        });
    }

    res.sendStatus(403);
});
