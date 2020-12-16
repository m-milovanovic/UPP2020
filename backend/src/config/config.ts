import dotenv from 'dotenv'

dotenv.config();

const CAMUNDA_API = process.env.CAMUNDA_API;

export {
  CAMUNDA_API
}