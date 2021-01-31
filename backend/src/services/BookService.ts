import { Book } from '../entities/Book';


const find = async () => {
  return await Book.find({
    relations: ['writer'],
  });
}

const findById = async (id: number) => {
  return await Book.findOne({
    where:{
      id
    },
    relations: ['writer']
  })
}

const save = async (book: Book) => {
  await book.save();
}


export default {
  find,
  findById,
  save
}