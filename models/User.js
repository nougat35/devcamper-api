const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        defautl: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.getSignedJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.generateResetPasswordToken = async function () {
    const resetToken = crypto
        .createHash('SHA256')
        .update(crypto.randomBytes(20).toString('hex'))
        .digest('hex');

    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await this.save();

    return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
