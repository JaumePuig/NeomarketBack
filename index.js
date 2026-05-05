import express from 'express';
import cors from 'cors';
import productRouter from './src/routes/product.routes.js';
import { dbConfig } from './src/config/db.config.js';

const api = express();
const port = 3000;


await dbConfig();


api.use(cors({
  origin: 'http://localhost:4200'
}));

api.use(express.json());

api.get('/', (req, res) => {
  res.send("API funcionando 🚀");
});

api.use('/api/productos', productRouter);

api.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});