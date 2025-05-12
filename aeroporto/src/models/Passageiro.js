const mongoose = require('mongoose');

const PassageiroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do passageiro é obrigatório'],
    trim: true
  },
  cpf: {
    type: String,
    required: [true, 'O CPF é obrigatório'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v);
      },
      message: 'CPF deve conter exatamente 11 dígitos numéricos'
    }
  },
  vooId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voo'
  },
  statusCheckIn: {
    type: String,
    enum: ['pendente', 'realizado'],
    default: 'pendente'
  }
});

module.exports = mongoose.model('Passageiro', PassageiroSchema);