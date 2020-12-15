import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { init } from './processes/Init';

createConnection().then((_connection) => {
  console.log('Database connected');
  const app = express();
  dotenv.config();
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT;


  app.listen(PORT, async () => {
    init();
    console.log(`Server running on port ${PORT}`);
  });
});
