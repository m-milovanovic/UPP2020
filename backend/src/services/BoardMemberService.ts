import { BoardMember } from '../entities/BoardMember';

const findByUsername = async (username: string) => {
  return await BoardMember.findOne({ username });
};

export default {
  findByUsername,
};
