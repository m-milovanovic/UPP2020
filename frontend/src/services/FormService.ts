import Axios from 'axios';
import { FormVariables } from '../interfaces';

const getFormVariables = async (processKey: string): Promise<FormVariables> => {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/process/${processKey}/form-variables`
  );
  let formVariables: FormVariables = { variables: {} };
  for (const key in response.data) {
    formVariables.variables[key] = {
      type: response.data[key].type,
      label: key,
      name: key,
      value: '',
    };
  }
  return formVariables;
};

const getGenres = async (): Promise<string[]> => {
  const response = await Axios.get(`${process.env.REACT_APP_API_URL}/genres`);
  return response.data;
};

const FormService = {
  getFormVariables,
  getGenres,
};

export default FormService;
