const express = require('express');
const router = express.Router();
const vooController = require('../controllers/vooController');

router.post('/', vooController.criarVoo);
router.get('/', vooController.listarVoos);
router.get('/:id', vooController.obterVoo);
router.put('/:id', vooController.atualizarVoo);
router.delete('/:id', vooController.deletarVoo);
router.put('/:id/status', vooController.atualizarStatusVoo);
router.put('/:id/portao', vooController.atribuirPortao);

module.exports = router;