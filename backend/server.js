const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ extended: false })); // Permite que o app aceite dados JSON no corpo da requisição

// Rota de teste
app.get('/', (req, res) => res.send('API Rodando'));

// Definir Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); // Será implementada a seguir

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
