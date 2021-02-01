import fs from 'fs/promises';
import { BOOKS_PATH } from '../config/config';
import { Book } from '../entities/Book';
import mime from 'mime-types';

const loadFileFromRepository = async (id: number) => {
  const bookInfo = await Book.findOne({ id });
  console.log('BOOK PATH: ',`${BOOKS_PATH}\\${id}\\${bookInfo.extension}`)
  const bookBase64 =  await fs.readFile(`${BOOKS_PATH}\\${id}\\${bookInfo.extension}`, { encoding: 'base64' });
  return {
    value: bookBase64,
    type: 'File',
    valueInfo:{
      filename: bookInfo.getFullName(),
      mimeType: mime.lookup('.'+bookInfo.extension),
      encoding: "UTF-8",
    }
  }
};

export default {
  loadFileFromRepository
}
