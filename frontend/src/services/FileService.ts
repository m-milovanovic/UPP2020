import Axios from 'axios';

const getFiles = async (processInstanceId: string) => {
  const response = await Axios.get(`${process.env.REACT_APP_API_URL}/files/${processInstanceId}`);

  return response.data.map((file: any) => ({
    name: file.name.split('---')[0],
    id: file.id,
  }));
};

const FileService = {
  getFiles,
};

export default FileService;
