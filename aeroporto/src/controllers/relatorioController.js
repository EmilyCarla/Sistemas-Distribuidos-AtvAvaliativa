const Voo = require('../models/Voo');
const Passageiro = require('../models/Passageiro');

exports.gerarRelatorioDiario = async (req, res) => {
  try {
    // Data atual - início do dia
    const hojeInicio = new Date();
    hojeInicio.setHours(0, 0, 0, 0);
    
    // Data atual - fim do dia
    const hojeFim = new Date();
    hojeFim.setHours(23, 59, 59, 999);
    
    // Buscar voos programados para hoje
    const voos = await Voo.find({
      dataHoraPartida: {
        $gte: hojeInicio,
        $lte: hojeFim
      }
    }).populate('portaoId');
    
    // Para cada voo, buscar os passageiros
    const relatorio = await Promise.all(voos.map(async (voo) => {
      const passageiros = await Passageiro.find({ vooId: voo._id });
      
      return {
        numeroVoo: voo.numeroVoo,
        origem: voo.origem,
        destino: voo.destino,
        dataHoraPartida: voo.dataHoraPartida,
        status: voo.status,
        portao: voo.portaoId ? voo.portaoId.codigo : null,
        passageiros: passageiros.map(p => ({
          nome: p.nome,
          cpf: p.cpf,
          statusCheckIn: p.statusCheckIn
        }))
      };
    }));
    
    res.json({
      data: new Date().toISOString().split('T')[0],
      totalVoos: relatorio.length,
      voos: relatorio
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};