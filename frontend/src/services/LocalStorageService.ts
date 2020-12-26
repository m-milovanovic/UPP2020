const setJwt = (token: string) => localStorage.setItem('jwt', token)
const getJwt = () => localStorage.getItem('jwt')
const removeJwt = () => localStorage.removeItem('jwt')

const LocalStorageService = {
  setJwt,
  getJwt,
  removeJwt
};

export default LocalStorageService;
