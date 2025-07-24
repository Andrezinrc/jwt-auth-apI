const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
console.log('URI:', MONGO_URI);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

// Conexão com o MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB conectado com sucesso!');
}).catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
});

app.get('/', (req, res) => {
  res.send('API rodando...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
