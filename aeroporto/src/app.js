require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const passageiroRoutes = require('./routes/passageiroRoutes');
const vooRoutes = require('./routes/vooRoutes');
const portaoRoutes = require('./routes/portaoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/passageiros', passageiroRoutes);
app.use('/api/voos', vooRoutes);
app.use('/api/portoes', portaoRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Gestão de Aeroporto');
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});