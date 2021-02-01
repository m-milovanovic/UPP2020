import axios from 'axios';
import { CAMUNDA_API } from '../config/config';

const create = async (data: any) => {
  await axios.post(`${CAMUNDA_API}/user/create`, data);
};

const remove = async (username: string) => {
  console.log("DELETE", username)
  await axios.delete(`${CAMUNDA_API}/user/${username}`);
}

export default {
  create,
  remove
};
