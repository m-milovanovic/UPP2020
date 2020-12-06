import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Axios from 'axios';

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

app.get('/process/:id/form-variables', async (req, res) => {
  const result = await Axios.get(
    `${CAMUNDA_REST}/process-definition/key/${req.params.id}/form-variables`
  );
  res.json(result.data);
});

app.get('/genres', async (_req, res) => {
  const genres = ['SciFi', 'Fantasy', 'Economics', 'Science'];
  res.json(genres);
});

app.post('/process/:id/submit-form', async (req, res) => {
  const body = req.body;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const result = await Axios.post(
      `${CAMUNDA_REST}/process-definition/key/${req.params.id}/submit-form`,
      body,
      options
    );
    res.json(result.data);
  } catch (error) {
    res.status(400).json(error).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
