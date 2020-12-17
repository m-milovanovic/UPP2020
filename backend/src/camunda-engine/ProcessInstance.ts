import axios from 'axios';
import { CAMUNDA_API } from '../config/config';
import { createJsonOptions } from '../util/requestUtil';

const getVariable = async (id: string, varName: string) => {
  const result = await axios.get(`${CAMUNDA_API}/process-instance/${id}/variables/${varName}`);
  return result.data;
};

const sendMessage = async (processInstanceId: string, messageName: string): Promise<boolean> => {
  const options = createJsonOptions();
  const data = {
    processInstanceId,
    messageName,
  };
  try {
    await axios.post(`${CAMUNDA_API}/message`, data, options);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  getVariable,
  sendMessage,
};
