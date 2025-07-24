const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

        // Compara a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Senha inválida' });

        // Cria payload do token
        const payload = { id: user._id };

        // Gera o token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
