import { Reader } from '../entities/Reader';
import { Writer } from '../entities/Writer';

const resolveTable = (tableKey: string): any => {
  switch (tableKey) {
    case 'readers':
      return Reader;
    case 'writers':
      return Writer;
    default:
      return Reader;
  }
};

export default resolveTable;
