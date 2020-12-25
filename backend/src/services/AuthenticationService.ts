import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Reader } from '../entities/Reader';
import { Writer } from '../entities/Writer';
import ReaderService from './ReaderService';
import WriterService from './WriterService';
import AccountStatus from '../entities/AccountStatus';
import { SECRET } from '../config/config';

const generateToken = (user) => {
  let infoForToken: any = {
    username: user.username,
    status: user.status,
  };
  if (user instanceof Writer) {
    infoForToken.type = 'Writer';
  } else {
    infoForToken.type = 'Reader';
  }

  return jwt.sign(infoForToken, SECRET);
};

const authenticate = async (username: string, password: string) => {
  const reader: Reader = await ReaderService.findByUsername(username);
  if (reader) {
    const ind: boolean = await bcrypt.compare(password, reader.password);
    if (ind && reader.status == AccountStatus.ACTIVATED) {
      return {
        ind: true,
        token: await generateToken(reader),
      };
    }
  } else {
    const writer: Writer = await WriterService.findByUsername(username);
    console.log(writer)
    const ind: boolean = await bcrypt.compare(password, writer.password);
    if (
      ind &&
      writer.status !== AccountStatus.DECLINED &&
      writer.status !== AccountStatus.NOT_ACTIVATED
    ) {
      return {
        ind: true,
        token: await generateToken(writer),
      };
    }
  }
  return {
    ind: false,
    token: '',
  };
};

export default {
  authenticate,
};
