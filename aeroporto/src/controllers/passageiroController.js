const Passageiro = require('../models/Passageiro');
const Voo = require('../models/Voo');

exports.criarPassageiro = async (req, res) => {
  try {
    const passageiro = new Passageiro(req.body);
    await passageiro.save();
    res.status(201).json(passageiro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarPassageiros = async (req, res) => {
  try {
    const passageiros = await Passageiro.find().populate('vooId');
    res.json(passageiros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obterPassageiro = async (req, res) => {
  try {
    const passageiro = await Passageiro.findById(req.params.id).populate('vooId');
    if (!passageiro) {
      return res.status(404).json({ error: 'Passageiro não encontrado' });
    }
    res.json(passageiro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarPassageiro = async (req, res) => {
  try {
    const passageiro = await Passageiro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('vooId');
    
    if (!passageiro) {
      return res.status(404).json({ error: 'Passageiro não encontrado' });
    }
    res.json(passageiro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarPassageiro = async (req, res) => {
  try {
    const passageiro = await Passageiro.findByIdAndDelete(req.params.id);
    if (!passageiro) {
      return res.status(404).json({ error: 'Passageiro não encontrado' });
    }
    res.json({ message: 'Passageiro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fazerCheckIn = async (req, res) => {
  try {
    const passageiro = await Passageiro.findById(req.params.id).populate('vooId');
    
    if (!passageiro) {
      return res.status(404).json({ error: 'Passageiro não encontrado' });
    }
    
    if (!passageiro.vooId) {
      return res.status(400).json({ error: 'Passageiro não está associado a nenhum voo' });
    }
    
    if (passageiro.vooId.status !== 'embarque') {
      return res.status(400).json({ error: 'Check-in só pode ser realizado quando o voo está em status de embarque' });
    }
    
    passageiro.statusCheckIn = 'realizado';
    await passageiro.save();
    
    res.json(passageiro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};