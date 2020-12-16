import axios from 'axios';
import { CAMUNDA_API } from '../config/config';

const getVariable = async (id: string, varName: string) => {
  console.log(CAMUNDA_API);
  const result = await axios.get(`${CAMUNDA_API}/process-instance/${id}/variables/${varName}`)
  return result.data;
}

export default {
  getVariable
}