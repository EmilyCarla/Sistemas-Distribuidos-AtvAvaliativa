const Voo = require('../models/Voo');
const Portao = require('../models/Portao');

exports.criarVoo = async (req, res) => {
  try {
    const voo = new Voo(req.body);
    await voo.save();
    res.status(201).json(voo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarVoos = async (req, res) => {
  try {
    const voos = await Voo.find().populate('portaoId');
    res.json(voos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obterVoo = async (req, res) => {
  try {
    const voo = await Voo.findById(req.params.id).populate('portaoId');
    if (!voo) {
      return res.status(404).json({ error: 'Voo não encontrado' });
    }
    res.json(voo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarVoo = async (req, res) => {
  try {
    const voo = await Voo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('portaoId');
    
    if (!voo) {
      return res.status(404).json({ error: 'Voo não encontrado' });
    }
    res.json(voo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarVoo = async (req, res) => {
  try {
    const voo = await Voo.findByIdAndDelete(req.params.id);
    if (!voo) {
      return res.status(404).json({ error: 'Voo não encontrado' });
    }
    
    // Liberar o portão se estiver associado
    if (voo.portaoId) {
      await Portao.findByIdAndUpdate(voo.portaoId, { disponivel: true });
    }
    
    res.json({ message: 'Voo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarStatusVoo = async (req, res) => {
  try {
    const { status } = req.body;
    const voo = await Voo.findById(req.params.id);
    
    if (!voo) {
      return res.status(404).json({ error: 'Voo não encontrado' });
    }
    
    if (!['programado', 'embarque', 'concluído'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    voo.status = status;
    
    // Se o voo foi concluído, liberar o portão
    if (status === 'concluído' && voo.portaoId) {
      await Portao.findByIdAndUpdate(voo.portaoId, { disponivel: true });
    }
    
    await voo.save();
    
    res.json(await Voo.findById(voo._id).populate('portaoId'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atribuirPortao = async (req, res) => {
  try {
    const { portaoId } = req.body;
    const voo = await Voo.findById(req.params.id);
    const portao = await Portao.findById(portaoId);
    
    if (!voo) {
      return res.status(404).json({ error: 'Voo não encontrado' });
    }
    
    if (!portao) {
      return res.status(404).json({ error: 'Portão não encontrado' });
    }
    
    if (!portao.disponivel) {
      return res.status(400).json({ error: 'Portão já está em uso' });
    }
    
    // Liberar o portão anterior se existir
    if (voo.portaoId) {
      await Portao.findByIdAndUpdate(voo.portaoId, { disponivel: true });
    }
    
    // Atribuir o novo portão
    voo.portaoId = portaoId;
    await voo.save();
    await Portao.findByIdAndUpdate(portaoId, { disponivel: false });
    
    res.json(await Voo.findById(voo._id).populate('portaoId'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};