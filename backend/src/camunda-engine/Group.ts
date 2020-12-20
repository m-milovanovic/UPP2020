import axios from 'axios';
import { CAMUNDA_API } from '../config/config';

const assign = async (groupID: string, username: string) => {
  await axios.put(`${CAMUNDA_API}/group/${groupID}/members/${username}`);
};

export default {
  assign,
};
