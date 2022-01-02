const express = require('express');
const { loginUser, registerUser, whoAmi } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/whoami', protect, whoAmi);

module.exports = router;
