const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Rota de registro de usuário
router.post('/register', registerUser);

module.exports = router;
