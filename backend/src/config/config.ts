import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT;
const CAMUNDA_API = process.env.CAMUNDA_API;
const FRONTEND_URL = process.env.FRONTEND_URL;

//Bcrypt param
const SALT_ROUNDS = 10

//MAIL info
const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

//JWT
const SECRET = process.env.SECRET;


//FILE_PATHS
const BOOKS_PATH = process.env.BOOK_PATH;

export {
  PORT,
  CAMUNDA_API,
  SALT_ROUNDS,
  FRONTEND_URL,
  MAIL_FROM,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  SECRET,
  BOOKS_PATH
}