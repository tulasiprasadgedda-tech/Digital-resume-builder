const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateFavorites } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/favorites', protect, updateFavorites);

module.exports = router;
