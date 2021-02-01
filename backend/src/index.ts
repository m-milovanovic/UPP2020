import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { PORT } from './config/config';
import { init } from './processes/Init';
import { createConnection } from 'typeorm';

//Routers
import authenticationRouter from './controllers/AuthenticationController';
import processController from './controllers/ProcessController';
import taskController from './controllers/TaskController';
import paymentController from './controllers/PaymentController';
import userController from './controllers/UserController';
import fileController from './controllers/FileController';

//Middlewares
import tokenMiddleware from './middlewares/tokenMiddleware';
import { handleErrors } from './middlewares/handleErrors';

createConnection().then((_connection) => {
  console.log('Database connected');
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(tokenMiddleware);
  app.use('/api/payment', paymentController);
  app.use('/api/user', userController);
  app.use('/api/files', fileController);
  app.use('/api/authentication', authenticationRouter);
  app.use('/api/processes', processController);
  app.use('/api/tasks', taskController);
  app.use(handleErrors);

  app.listen(PORT, async () => {
    init();
    console.log(`Server running on port ${PORT}`);
  });
});
