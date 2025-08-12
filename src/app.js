import express from 'express'
import cors from 'cors'

import deleteRouter from './routes/deleteRouter.js'
import getRouter from './routes/getRouter.js'
import postRouter from './routes/postRouter.js'
import putRouter from './routes/putRouter.js'

import cookieParser from 'cookie-parser'

const app = express();


const corsOptions = {
  origin: ['https://matiaslucescgmail-com-lurefrontend.mdbgo.io'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  exposedHeaders: 'Authorization',
  
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(cookieParser())
app.use('/', deleteRouter);
app.use('/', postRouter);
app.use('/', putRouter);
app.use('/', getRouter);
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
