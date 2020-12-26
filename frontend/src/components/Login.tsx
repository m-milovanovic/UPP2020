import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/login_logo.png';
import AuthService from '../services/AuthService';
import LocalStorageService from '../services/LocalStorageService';

interface LoginProps {
  setUser: any;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    AuthService.login(username, password).then((response) => {
      LocalStorageService.setJwt(response.data);
      setUser(response.data);
      history.push('/user');
    });
  };

  return (
    <div className='container bg-white'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-6 col-sm-12 bg-white p-0'>
          <img src={logo} alt='' className='w-100 float rounded' />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12 px-4 bg-white flex-column d-flex align-items-center justify-content-center'>
          <h3 className='mb-5'>LOGIN</h3>
          <form className='w-100' onSubmit={handleLogin}>
            <div className='mb-3 '>
              <input
                type='text'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className='form-control'
                placeholder='Username'
              />
            </div>
            <div className='mb-3'>
              <input
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className='form-control'
                placeholder='Password'
              />
            </div>
            <div className='mb-3'>
              <input type='submit' className='btn btn-primary w-100' value='Login' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
