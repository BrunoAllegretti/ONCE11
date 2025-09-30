import express from 'express';
import cors from 'cors';
import { produto } from './src/components/Products';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/products/search', (req, res) => {
  const q = (req.query.q || '').toString().toLowerCase();
  console.log('Query recebida:', q);  
  const results = produto.maisComprados.filter(p =>
    p.name.toLowerCase().includes(q)
  );
  res.json(results);
});


app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
