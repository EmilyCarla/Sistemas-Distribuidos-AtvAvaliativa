const mongoose = require('mongoose');

const VooSchema = new mongoose.Schema({
  numeroVoo: {
    type: String,
    required: [true, 'O número do voo é obrigatório'],
    unique: true,
    trim: true
  },
  origem: {
    type: String,
    required: [true, 'A origem é obrigatória'],
    trim: true
  },
  destino: {
    type: String,
    required: [true, 'O destino é obrigatório'],
    trim: true
  },
  dataHoraPartida: {
    type: Date,
    required: [true, 'A data e hora de partida são obrigatórias']
  },
  portaoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portao'
  },
  status: {
    type: String,
    enum: ['programado', 'embarque', 'concluído'],
    default: 'programado'
  }
});

module.exports = mongoose.model('Voo', VooSchema);