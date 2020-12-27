import axios from 'axios';
import { CAMUNDA_API } from '../config/config';
import { createJsonOptions } from '../util/requestUtil';

const getVariable = async (id: string, varName: string) => {
  const result = await axios.get(`${CAMUNDA_API}/process-instance/${id}/variables/${varName}`);
  return result.data;
};

const getByUsername = async (username: string, processKey: string) => {
  const options = createJsonOptions();
  const data = {
    variables: [
      {
        name: 'username',
        operator: 'eq',
        value: username,
      },
    ],
    processDefinitionKey: processKey,
  };
  const result = await axios.post(`${CAMUNDA_API}/process-instance`, data, options);
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
  getByUsername
};
