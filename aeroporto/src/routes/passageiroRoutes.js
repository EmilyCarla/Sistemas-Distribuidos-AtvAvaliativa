const express = require('express');
const router = express.Router();
const passageiroController = require('../controllers/passageiroController');

router.post('/', passageiroController.criarPassageiro);
router.get('/', passageiroController.listarPassageiros);
router.get('/:id', passageiroController.obterPassageiro);
router.put('/:id', passageiroController.atualizarPassageiro);
router.delete('/:id', passageiroController.deletarPassageiro);
router.post('/:id/checkin', passageiroController.fazerCheckIn);

module.exports = router;