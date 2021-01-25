import { SALT_ROUNDS } from '../config/config';
import { Reader } from '../entities/Reader';
import bcrypt from 'bcrypt';
import AccountStatus from '../entities/AccountStatus';
import CamundaUserService from '../camunda-engine/User';
import CamundaGroupService from '../camunda-engine/Group';
import { createCamundaUser } from '../util/requestUtil';

const findByUsername = async (username: string) => {
  return await Reader.findOne({ username })
}

const save = async (reader: Reader) => {
  const camundaUserRequestData = createCamundaUser(reader);
  await CamundaUserService.create(camundaUserRequestData);
  await CamundaGroupService.assign('readers', reader.username);
  reader.password = await bcrypt.hash(reader.password, SALT_ROUNDS);
  await reader.save();
};

const activateAccount = async (username: string) => {
  const reader: Reader = await Reader.findOne({ username });
  reader.status = AccountStatus.ACTIVATED;
  await Reader.save(reader);
};

const getBetaReadersByGenre = async (genre: string) => {
  const readers: Reader[] = await Reader.find()
  return readers.filter(reader => reader.betaGenres.includes(genre))
}

export default { findByUsername, save, activateAccount, getBetaReadersByGenre };