import Axios from 'axios';
import { FormVariables } from '../interfaces';

const getFormVariables = async (processKey: string): Promise<FormVariables> => {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/process/${processKey}/form-variables`
  );
  let formVariables: FormVariables = { variables: {} };
  response.data.forEach((variable: any) => {
    formVariables.variables[variable.name] = {
      inputType: variable.type,
      label: variable.label,
      value: '',
      name: variable.name,
      constraints: variable.constraints,
    };
  });
  return formVariables;
};

const getGenres = async (): Promise<string[]> => {
  const response = await Axios.get(`${process.env.REACT_APP_API_URL}/genres`);
  return response.data;
};

const getRenderedForm = async (processKey: string): Promise<string> => {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/process/${processKey}/rendered-form`
  );
  return response.data;
};

const FormService = {
  getFormVariables,
  getGenres,
  getRenderedForm,
};

export default FormService;
