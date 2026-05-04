import express from 'express';
import userRouter from './src/routes/user.routes.js';
import multer from 'multer';
import {imgMiddleware} from './src/middleware/img.middleware.js';

const api = express();
api.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const uploads=multer({ storage: storage })

const port = 3000;

api.get('/', (req, res) =>{
    res.send("Conectado");
});

api.use('/api', userRouter);

api.post('/profile', uploads.single('avatar'), (req, res)=>{
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send("archivo enviado")
})

api.post('/middleProfile', imgMiddleware, uploads.single('avatar'), (req, res)=>{
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send("archivo enviado")
})

api.listen(port, () =>{
    console.log(`Conectado a la url https://localhost:${port}`);
});