const express = require('express');
const router = express.Router();
const { login, logout, getMe } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

// Admin authentication routes
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/me', authenticateAdmin, getMe);

module.exports = router;
