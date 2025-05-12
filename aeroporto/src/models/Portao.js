const mongoose = require('mongoose');

const PortaoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, 'O código do portão é obrigatório'],
    unique: true,
    trim: true,
    uppercase: true
  },
  disponivel: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Portao', PortaoSchema);