import express from 'express';
import productRouter from './src/routes/product.routes.js';
import { dbConfig } from './src/config/db.config.js'; // 👈 IMPORTANTE

const api = express();
api.use(express.json());

const port = 3000;

// 👇 CONECTAR A MONGO AQUÍ
await dbConfig();

api.get('/', (req, res) => {
  res.send("API funcionando 🚀");
});

// rutas
api.use('/api/productos', productRouter);

api.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});