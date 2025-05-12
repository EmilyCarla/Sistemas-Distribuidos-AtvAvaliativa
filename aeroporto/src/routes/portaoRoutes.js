const express = require('express');
const router = express.Router();
const portaoController = require('../controllers/portaoController');

router.post('/', portaoController.criarPortao);
router.get('/', portaoController.listarPortoes);
router.get('/:id', portaoController.obterPortao);
router.put('/:id', portaoController.atualizarPortao);
router.delete('/:id', portaoController.deletarPortao);

module.exports = router;