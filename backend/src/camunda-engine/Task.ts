import axios from 'axios';
import { CAMUNDA_API } from '../config/config';
import { createJsonOptions } from '../util/requestUtil';

const getTask = async (processID: string, assignee: string) => {
  const options = createJsonOptions();
  const data = {
    processInstanceId: processID,
    assignee: assignee ? assignee : undefined,
  };
  const result = await axios.post(`${CAMUNDA_API}/task`, data, options);
  return result.data;
};

const getTaskById = async (taskId: string) => {
  const options = createJsonOptions();
  const result = await axios.get(`${CAMUNDA_API}/task/${taskId}`, options);
  return result.data;
};

const complete = async (taskID: string, data: any) => {
  const options = createJsonOptions();
  const result = await axios.post(`${CAMUNDA_API}/task/${taskID}/complete`, data, options);
  return result.data;
};

const getAssignedTasks = async (username: string) => {
  const options = createJsonOptions();
  const data = {
    assignee: username,
  };
  const result = await axios.post(`${CAMUNDA_API}/task`, data, options);
  return result.data.map((task: any) => {
    return {
      id: task.id,
      name: task.name,
    };
  });
};

export default {
  getTask,
  complete,
  getAssignedTasks,
  getTaskById,
};
