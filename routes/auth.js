const express = require('express');
const {
    loginUser,
    registerUser,
    getMe,
    forgotPassword,
    resetPassword,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
