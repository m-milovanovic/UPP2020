import Axios from 'axios';

const login = (username: string, password: string) => {
  return Axios.post(`${process.env.REACT_APP_API_URL}/authentication`, {
    username: username,
    password: password,
  });
};

const getUserData = async () => {
  const response = await Axios.get(`${process.env.REACT_APP_API_URL}/user/data`);
  return response.data;
};

const AuthService = {
  login,
  getUserData,
};

export default AuthService;
