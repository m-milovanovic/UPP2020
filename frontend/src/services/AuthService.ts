import Axios from 'axios'

const login = (username: string, password: string) => {
  return Axios.post(`${process.env.REACT_APP_API_URL}/authentication`, { username: username, password: password })
}



const AuthService = {
  login
}

export default AuthService