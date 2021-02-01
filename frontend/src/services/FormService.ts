import Axios from 'axios';
import { FormVariables } from '../interfaces';

const startProcess = async (processKey: string): Promise<string> => {
  // ovde se startuje proces i vraca se processId
  return '12141414';
};

const getFormVariables = async (processKey: string): Promise<FormVariables> => {
  //ovde treba da bude taskId
  const response = await Axios.post(`${process.env.REACT_APP_API_URL}/api/${processKey}`);
  let formVariables: FormVariables = { variables: {}, additionalData: null };

  response.data.properties.forEach((variable: any) => {
    formVariables.variables[variable.name] = {
      inputType: variable.inputType,
      label: variable.label,
      value: '',
      name: variable.name,
      constraints: variable.constraints,
      options: variable.options,
    };
  });

  //LocalStorageService.setTaskId(response.data.taskId);

  return formVariables;
};

const FormService = {
  startProcess,
  getFormVariables,
};

export default FormService;
