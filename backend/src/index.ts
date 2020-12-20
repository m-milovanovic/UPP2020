import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { PORT } from './config/config';
import { init } from './processes/Init';
import { createConnection } from 'typeorm';

//Routers
import authenticationRouter from './controllers/models/AuthenticationController';
import registerReaderRouter from './controllers/models/ReaderController';
import ProcessController from './controllers/models/ProcessController';
import TaskController from './controllers/models/TaskController';

//Middlewares
import tokenMiddleware from './middlewares/tokenMiddleware';

createConnection().then((_connection) => {
  console.log("Database connected");
  const app = express();
  app.use(cors());
  app.use(express.json({limit: '50mb'}));
  app.use(tokenMiddleware);
  app.use('/api/authentication', authenticationRouter);
  app.use('/api/registerReader', registerReaderRouter);
  app.use('/api/processes', ProcessController);
  app.use('/api/tasks', TaskController);

  app.listen(PORT, async () => {
    init();
    console.log(`Server running on port ${PORT}`);
  });
});
