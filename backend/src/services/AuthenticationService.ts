import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Reader } from '../entities/Reader';
import { Writer } from '../entities/Writer';
import ReaderService from './ReaderService';
import WriterService from './WriterService';
import AccountStatus from '../entities/AccountStatus';
import { SECRET } from '../config/config';
import { Staff } from '../entities/Staff';
import StaffService from './StaffService';

const generateToken = (user) => {
  let infoForToken: any = {
    username: user.username,
    status: user.status,
  };
  if (user instanceof Writer) {
    infoForToken.type = 'writer';
  } else if (user instanceof Reader) {
    infoForToken.type = 'reader';
  } else {
    infoForToken.type = 'staff';
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
  const staff: Staff = await StaffService.findByUsername(username);
  if (staff) {
    const ind: boolean = await bcrypt.compare(password, staff.password);
    if (ind) {
      return {
        ind: true,
        token: await generateToken(staff),
      };
    }
  }

  return {
    ind: false,
    token: '',
  };
};

const getUserData = async (username: string) => {
  const reader: Reader = await ReaderService.findByUsername(username);
  if (reader) {
    return { ...reader, type: 'reader' };
  }
  const writer: Writer = await WriterService.findByUsername(username);
  if (writer) {
    return { ...writer, type: 'writer' };
  }
  const staff: Staff = await StaffService.findByUsername(username);
  if (staff) {
    return { ...staff, type: 'staff' };
  }
  return null;
};

export default {
  authenticate,
  getUserData,
};
