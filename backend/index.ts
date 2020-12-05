import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const CAMUNDA_REST = process.env.CAMUNDA_REST;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/:id/form-variables', async (req, res) => {
  const result = await axios.get(`${CAMUNDA_REST}/process-definition/key/${req.params.id}/form-variables`);
  res.json(result.data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});