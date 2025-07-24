const mongoose = require("mongoose");

/*
  Schema do usuário:
  - name: string, obrigatório, remove espaços extras
  - email: string, obrigatório, unico, tudo em minúsculo, remove espaços extras
  - password: string, obrigatório
  - timestamps: cria campos automáticos createdAt e updatedAt
*/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
