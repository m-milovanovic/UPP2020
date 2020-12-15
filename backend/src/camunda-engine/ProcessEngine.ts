import axios from 'axios';

const CAMUNDA_REST = process.env.CAMUNDA_REST;

const startProcessInstance = async (key: string) => {
  const result = await axios.get(`${CAMUNDA_REST}/process-definition/key/${key}/start`);
  return result.data;
};

const submitStartForm = async (key: string, data) => {
  const result = await axios.post(`${CAMUNDA_REST}/process-definition/key/${key}/submit-form`, data);
  return result.data;
};

const getTaskFormVariables = async (taskId: string) => {
  const result = await axios.get(`${CAMUNDA_REST}/task/${taskId}/form-variables`);
  return result.data;
};

const getStartFormVariables = async (proccssId: string) => {
  const result = await axios.get(
    `${CAMUNDA_REST}/process-definition/key/${proccssId}/form-variables`
  );
  return result.data;
};

export default {
  startProcessInstance,
  submitStartForm,
  getTaskFormVariables,
  getStartFormVariables,
};
