const Portao = require('../models/Portao');

exports.criarPortao = async (req, res) => {
  try {
    const portao = new Portao(req.body);
    await portao.save();
    res.status(201).json(portao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarPortoes = async (req, res) => {
  try {
    const portoes = await Portao.find();
    res.json(portoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obterPortao = async (req, res) => {
  try {
    const portao = await Portao.findById(req.params.id);
    if (!portao) {
      return res.status(404).json({ error: 'Portão não encontrado' });
    }
    res.json(portao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarPortao = async (req, res) => {
  try {
    const portao = await Portao.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!portao) {
      return res.status(404).json({ error: 'Portão não encontrado' });
    }
    res.json(portao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarPortao = async (req, res) => {
  try {
    // Verificar se o portão está em uso por algum voo
    const vooComPortao = await Voo.findOne({ portaoId: req.params.id });
    if (vooComPortao) {
      return res.status(400).json({ error: 'Não é possível deletar um portão em uso por um voo' });
    }
    
    const portao = await Portao.findByIdAndDelete(req.params.id);
    if (!portao) {
      return res.status(404).json({ error: 'Portão não encontrado' });
    }
    res.json({ message: 'Portão deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};