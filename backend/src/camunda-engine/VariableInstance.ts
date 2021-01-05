import axios from 'axios';
import { CAMUNDA_API } from '../config/config';

const getVariable = async (varName: string) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await axios.post(
    `${CAMUNDA_API}/variable-instance`,
    { variableName: varName },
    options
  );
  return result.data[0];
};

const getVariables = async (varNameLike: string, processInstanceId: string) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await axios.post(
    `${CAMUNDA_API}/variable-instance`,
    { variableNameLike: varNameLike, processInstanceIdIn: [processInstanceId] },
    options
  );
  return result.data;
};

const getVariableData = async (id: string) => {
  const result = await axios.get(`${CAMUNDA_API}/variable-instance/${id}/data`);
  return result.data;
};

const getVariableById = async (id: string) => {
  const result = await axios.get(`${CAMUNDA_API}/variable-instance/${id}`);
  return result.data;
};

export default {
  getVariables,
  getVariable,
  getVariableData,
  getVariableById
};
