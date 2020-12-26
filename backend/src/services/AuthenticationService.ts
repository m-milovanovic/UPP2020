import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Reader } from '../entities/Reader';
import { Writer } from '../entities/Writer';
import ReaderService from './ReaderService';
import WriterService from './WriterService';
import AccountStatus from '../entities/AccountStatus';
import { SECRET } from '../config/config';
import { BoardMember } from '../entities/BoardMember';
import BoardMemberService from './BoardMemberService';

const generateToken = (user) => {
  let infoForToken: any = {
    username: user.username,
    status: user.status,
  };
  if (user instanceof Writer) {
    infoForToken.type = 'Writer';
  } else if (user instanceof Reader) {
    infoForToken.type = 'Reader';
  } else {
    infoForToken.type = 'BoardMember';
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
  }
  const writer: Writer = await WriterService.findByUsername(username);
  if (writer) {
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
  const boardMember: BoardMember = await BoardMemberService.findByUsername(username);
  if (boardMember) {
    const ind: boolean = await bcrypt.compare(password, boardMember.password);
    if (ind) {
      return {
        ind: true,
        token: await generateToken(boardMember),
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
