const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const requireLogin = require('../middleware/authMiddleware');

// Create user
router.post('/register', userController.createUser);

// Login user
router.post('/login', userController.loginUser);

// Logout user
router.post('/logout', userController.logoutUser);

// Protected admin route
router.get('/admin', requireLogin, (req, res) => {

    res.json({
        message: 'Protected admin area accessed successfully',
        username: req.session.username
    });

});

module.exports = router;