import Axios from "axios";
import { FormVariables, Task } from "../interfaces";

const getTaskFormVariables = async (taskId: string): Promise<FormVariables> => {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/tasks/${taskId}/formVariables`
  );
  let formVariables: FormVariables = { variables: {} };

  response.data.forEach((variable: any) => {
    formVariables.variables[variable.name] = {
      inputType: variable.inputType,
      label: variable.label,
      value: "",
      name: variable.name,
      constraints: variable.constraints,
      options: variable.options,
    };
  });
  return formVariables;
};

const completeTask = async (
  taskId: string,
  variables?: FormVariables
): Promise<void> => {
  return await Axios.post(
    `${process.env.REACT_APP_API_URL}/tasks/${taskId}/complete`,
    variables
  );
};

const getMyTasks = async (): Promise<Task[]> => {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/tasks/myTasks`
  );
  return response.data;
};

const TaskService = {
  getTaskFormVariables,
  completeTask,
  getMyTasks,
};

export default TaskService;
