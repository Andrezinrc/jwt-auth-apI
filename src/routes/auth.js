const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Rota de registro de usuário
router.post('/register', registerUser);

// Rota de login
router.post('/login', loginUser);

module.exports = router;
