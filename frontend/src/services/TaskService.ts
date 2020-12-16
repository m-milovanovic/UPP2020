import Axios from 'axios';
import { FormVariables, FormVariablesPOST } from '../interfaces';

const getTaskFormVariables = async (taskId: string): Promise<FormVariables> => {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/tasks/${taskId}/formVariables`
  );
  let formVariables: FormVariables = { variables: {} };

  response.data.forEach((variable: any) => {
    formVariables.variables[variable.name] = {
      inputType: variable.inputType,
      label: variable.label,
      value: '',
      name: variable.name,
      constraints: variable.constraints,
      options: variable.options,
    };
  });
  return formVariables;
};

const completeTask = async (taskId: string, variables?: FormVariablesPOST): Promise<void> => {
  return await Axios.post(
    `${process.env.REACT_APP_API_URL}/tasks/${taskId}/complete`,
    variables
  );
};

const TaskService = {
  getTaskFormVariables,
  completeTask,
};

export default TaskService;
