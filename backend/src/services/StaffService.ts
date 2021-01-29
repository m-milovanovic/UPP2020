import { Staff } from '../entities/Staff';
import StaffRole from '../entities/StaffRole';
import { getManager, In } from 'typeorm';

const findByUsername = async (username: string) => {
  return await Staff.findOne({ username });
};

const findMainEditor = async () => {
  return await Staff.findOne({ role: StaffRole.MAIN_EDITOR });
};

const findEditors = async () => {
  return await Staff.find({ role: StaffRole.EDITOR });
};

const findEditorByUsername = async (username: string) => {
  return await Staff.findOne({ username:username, role: StaffRole.EDITOR});
}

const findEditorsByUsernames = async (usernameParams: string[]) => {
  return await Staff.find({ role: StaffRole.EDITOR, username: In(usernameParams) });
};

const findBoardMembers = async () => {
  return await Staff.find({ role: StaffRole.BOARD_MEMBER });
};

const findRandomBoardMembers = async (num) => {
  return await getManager()
    .createQueryBuilder(Staff, 'staff')
    .where('staff.role = :role', { role: StaffRole.BOARD_MEMBER })
    .orderBy('RANDOM()')
    .take(num)
    .getMany();
};

const findLecturer = async () => {
  return await Staff.findOne({ role: StaffRole.LECTURER });
};

export default {
  findByUsername,
  findMainEditor,
  findEditors,
  findEditorByUsername,
  findEditorsByUsernames,
  findBoardMembers,
  findRandomBoardMembers,
  findLecturer,
};
