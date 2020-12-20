import dotenv from "dotenv";
dotenv.config();
import express from "express";
require('express-async-errors')
import cors from "cors";
import { createConnection } from "typeorm";
import { init } from "./processes/Init";
import registerReaderRouter from "./controllers/models/ReaderController";
import ProcessController from "./controllers/models/ProcessController";
import TaskController from "./controllers/models/TaskController";
import { handleErrors } from "./middleware/handleErrors";

createConnection().then((_connection) => {
  console.log("Database connected");
  const app = express();
  app.use(cors());
  app.use(express.json({limit: '50mb'}));
  app.use("/api/registerReader", registerReaderRouter);
  app.use("/api/processes", ProcessController);
  app.use("/api/tasks", TaskController);

  app.use(handleErrors);

  const PORT = process.env.PORT;

  app.listen(PORT, async () => {
    init();
    console.log(`Server running on port ${PORT}`);
  });
});
