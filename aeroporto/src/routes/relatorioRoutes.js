const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

router.get('/diario', relatorioController.gerarRelatorioDiario);

module.exports = router;