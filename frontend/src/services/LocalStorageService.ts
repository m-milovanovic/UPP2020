const setJwt = (token: string) => localStorage.setItem('jwt', token);
const getJwt = () => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    return jwt;
  } else {
    return '';
  }
};
const removeJwt = () => localStorage.removeItem('jwt');

const LocalStorageService = {
  setJwt,
  getJwt,
  removeJwt,
};

export default LocalStorageService;
