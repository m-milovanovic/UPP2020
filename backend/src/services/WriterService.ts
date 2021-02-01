import { Writer } from '../entities/Writer';
import bcrypt from 'bcrypt';
import { createCamundaUser } from '../util/requestUtil';
import CamundaUserService from '../camunda-engine/User';
import { SALT_ROUNDS } from '../config/config';
import AccountStatus from '../entities/AccountStatus';

const findByUsername = async (username: string) => {
  return await Writer.findOne({ username });
};

const save = async (writer: Writer) => {
  const camundaUserRequestData = createCamundaUser(writer);
  await CamundaUserService.create(camundaUserRequestData);
  writer.password = await bcrypt.hash(writer.password, SALT_ROUNDS);
  await writer.save();
};

const remove = async (username: string) => {
  await Writer.delete({ username});
  await CamundaUserService.remove(username);
}

const confirmWritersMail = async (username: string) => {
  const writer: Writer = await Writer.findOne({ username });
  writer.status = AccountStatus.NOT_APPROVED;
  await writer.save();
};

const approveWriter = async (username: string) => {
  const writer: Writer = await Writer.findOne({ username });
  writer.status = AccountStatus.NOT_PAID;
  await writer.save();
};

const declineWriter = async (username: string) => {
  const writer: Writer = await Writer.findOne({ username });
  writer.status = AccountStatus.DECLINED;
  await writer.save();
};

const confirmWritersPayment = async (username: string) => {
  const writer: Writer = await Writer.findOne({ username });
  writer.status = AccountStatus.ACTIVATED;
  await writer.save();
};

export default {
  findByUsername,
  save,
  remove,
  confirmWritersMail,
  approveWriter,
  declineWriter,
  confirmWritersPayment
};
