import { CamundaUser } from '../entities/CamundaUser';
import { Reader } from '../entities/Reader';
import { Writer } from '../entities/Writer';

const resolveTable = (tableKey: string): any => {
  switch (tableKey) {
    case 'readers':
      return Reader;
    case 'writers':
      return Writer;
    case 'camunda-users':
      return CamundaUser;
    default:
      return Reader;
  }
};

export default resolveTable;
