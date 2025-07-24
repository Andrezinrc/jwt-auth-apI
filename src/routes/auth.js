const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

// Rota de registro de usuario
router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;
});

