import { Book } from '../entities/Book';


const find = async () => {
  return await Book.find({
    relations: ['writer'],
  });
}

const save = async (book: Book) => {
  await book.save();
}


export default {
  find,
  save
}