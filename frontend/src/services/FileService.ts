import Axios from 'axios';

const getFiles = async (taskId: string) => {
  const response = await Axios.get(`${process.env.REACT_APP_API_URL}/files/${taskId}`);
  return response.data;
};

const FileService = {
  getFiles,
};

export default FileService;
