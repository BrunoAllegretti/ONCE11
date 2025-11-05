const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = './users.json';
const SECRET = 'minha_chave_super_secreta';

// Garante que o arquivo existe
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// --- Rota de registro ---
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Nome de usuário já existe' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, email });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

// --- Rota de login ---
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login bem-sucedido!', token });
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000 🚀'));
