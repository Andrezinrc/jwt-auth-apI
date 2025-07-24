const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Verifica se todos os campos foram enviados
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    // Verifica se o e-mail já está cadastrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria novo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
}

module.exports = {
  registerUser
};
