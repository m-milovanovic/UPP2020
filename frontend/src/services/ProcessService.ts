import Axios from 'axios';

const startProcess = async (processKey: string): Promise<string> => {
  let response = await Axios.get(`${process.env.REACT_APP_API_URL}/processes/${processKey}/start`);
  let processId = response.data;
  return processId;
};

const getActiveTaskId = async (processId: string): Promise<string> => {
  let response = await Axios.get(
    `${process.env.REACT_APP_API_URL}/processes/${processId}/activeTask`
  );
  return response.data;
};

const sendMessage = async (processId: string, messageName: string): Promise<boolean> => {
  let response = await Axios.post(
    `${process.env.REACT_APP_API_URL}/processes/message`,
    { processId, messageName },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const ProcessService = {
  startProcess,
  getActiveTaskId,
  sendMessage,
};

export default ProcessService;
