import { SALT_ROUNDS } from '../config/config';
import { Reader } from '../entities/Reader';
import bcrypt from 'bcrypt';
import AccountStatus from '../entities/AccountStatus';
import CamundaUserService from '../camunda-engine/User';
import { createCamundaUser } from '../util/requestUtil';

const findByUsername = async (username: string) => {
  return await Reader.findOne({ username })
}

const save = async (reader: Reader) => {
  const camundaUserRequestData = createCamundaUser(reader);
  await CamundaUserService.create(camundaUserRequestData);
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

const addPenaltyPoint = async (username: string) => {
  const reader: Reader = await findByUsername(username)
  reader.penaltyPoints += 1
  return await Reader.save(reader);
}

const revokeBetaStatus = async (username) => {
  const reader: Reader = await findByUsername(username)
  reader.beta = false
  return await Reader.save(reader)
}

const remove = async (username) => {
  await Reader.delete({ username });
  await CamundaUserService.remove(username);
}

export default { findByUsername, save, activateAccount, getBetaReadersByGenre, addPenaltyPoint, revokeBetaStatus, remove };