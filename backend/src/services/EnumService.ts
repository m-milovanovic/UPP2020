import BookService from './BookService';
import StaffService from './StaffService';

const getOptions = async (resourceKey: string) => {
  switch (true) {
    case resourceKey === 'genres':
      return ['SciFi', 'Economics', 'History'];
    case resourceKey === 'books':
      const books = await BookService.find();
      return books.map(
        (book) => book.name + ': ' + book.writer.firstName + ' ' + book.writer.lastName
      );
    case resourceKey === 'editors':
      const editors = await StaffService.findEditors();
      return editors.map((editor) => editor.username);
    case resourceKey.includes('parsearray'):
      return JSON.parse(resourceKey.split('-', 2)[1]);
    default:
      return [];
  }
};

const getObjectOptions = async (resourceKey: string) => {
  switch (true) {
    case resourceKey === 'books':
      const books = await BookService.find();
      return books.map((book) => ({
        id: book.id,
        value: book.getFullNameWithoutExt()
      }));
    default:
      return [];
  }
};

const EnumService = { getOptions, getObjectOptions };

export default EnumService;
