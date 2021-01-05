import axios from 'axios';
import { CAMUNDA_API } from '../config/config';
import { createJsonOptions } from '../util/requestUtil';

const startProcessInstance = async (key: string) => {
  console.log(CAMUNDA_API);
  const options = createJsonOptions();
  const result = await axios.post(
    `${CAMUNDA_API}/process-definition/key/${key}/start`,
    {},
    options
  );
  return result.data;
};

const submitStartForm = async (key: string, data) => {
  const options = createJsonOptions();
  const result = await axios.post(
    `${CAMUNDA_API}/process-definition/key/${key}/submit-form`,
    data,
    options
  );
  return result.data;
};

const getTaskFormVariables = async (taskId: string) => {
  const result = await axios.get(`${CAMUNDA_API}/task/${taskId}/form-variables`);
  return result.data;
};

const getStartFormVariables = async (proccssId: string) => {
  const result = await axios.get(
    `${CAMUNDA_API}/process-definition/key/${proccssId}/form-variables`
  );
  return result.data;
};

export default {
  startProcessInstance,
  submitStartForm,
  getTaskFormVariables,
  getStartFormVariables,
};
