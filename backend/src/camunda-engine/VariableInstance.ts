import axios from 'axios';
import { CAMUNDA_API } from '../config/config';

const getVariable = async (varName: string) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('here', varName)
  const result = await axios.post(
    `${CAMUNDA_API}/variable-instance`,
    { variableName: varName },
    options
  );
  return result.data[0];
};

export default {
  getVariable,
};
