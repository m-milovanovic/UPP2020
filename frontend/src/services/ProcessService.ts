import Axios from 'axios';
import LocalStorageService from './LocalStorageService';

const startProcess = async (processKey: string): Promise<string> => {
  let response = await Axios.get(`${process.env.REACT_APP_API_URL}/processes/${processKey}/start`);
  let processId = response.data;
  LocalStorageService.setProcessId(processId);
  return processId;
};

const getActiveTaskId = async (processId: string): Promise<string> => {
  let response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/processes/${processId}/activeTask`
  );
  return response.data;
};

const ProcessService = {
  startProcess,
  getActiveTaskId,
};

export default ProcessService;
