const getProcessId = () => localStorage.getItem('processId');
const setProcessId = (processId: string) => localStorage.setItem('processId', processId);
const removeProcessId = () => localStorage.removeItem('processId');

const setJwt = (token: string) => localStorage.setItem('jwt', token)
const getJwt = () => localStorage.getItem('jwt')

const LocalStorageService = {
  getProcessId,
  setProcessId,
  removeProcessId,
  setJwt,
  getJwt
};

export default LocalStorageService;
