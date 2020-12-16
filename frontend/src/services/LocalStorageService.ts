const getProcessId = () => localStorage.getItem('processId');
const setProcessId = (processId: string) => localStorage.setItem('processId', processId);
const removeProcessId = () => localStorage.removeItem('processId');

const LocalStorageService = {
  getProcessId,
  setProcessId,
  removeProcessId,
};

export default LocalStorageService;
