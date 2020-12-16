import axios from 'axios';
import { CAMUNDA_API } from '../config/config';
import { createJsonOptions } from '../util/requestUtil';

const getTask = async (processID: string, taskDefinitionKey: string) => {
  console.log(CAMUNDA_API);
  const options = createJsonOptions();
  const data = {
    "processInstanceId": processID,
    "taskDefinitionKey": taskDefinitionKey
  }
  const result = await axios.post(`${CAMUNDA_API}/task`,data, options)
  return result.data;
}

export default {
  getTask
}