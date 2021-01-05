import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AccountStatus } from '../interfaces';
import AuthService from '../services/AuthService';
import LocalStorageService from '../services/LocalStorageService';
import ProcessService from '../services/ProcessService';
import jwt_decode from 'jwt-decode';

interface HeaderProps {
  user: any;
  setUser: any;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    LocalStorageService.removeJwt();
    setUser(null);
    history.push('/login');
  };

  const goToPayment = () => {
    history.push('/payment');
  };

  const startPublish = async () => {
    const processId = await ProcessService.startProcess('publishBook', user.username);
    const activeTaskId = await ProcessService.getActiveTaskId(processId);
    if (activeTaskId) {
      history.push(`/user/tasks/${activeTaskId}`);
    } else {
      history.push('/user');
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AuthService.getUserData();
        setUser(userData);
      } catch (error) {}
    };
    getUserData();
  }, [setUser]);

  return (
    <nav className='navbar navbar-dark bg-primary justify-content-between p-2'>
      <Link className='navbar-brand' to={'/'}>
        Home
      </Link>
      {user ? (
        <div>
          {user?.type === 'writer' && user?.status === AccountStatus.ACTIVATED && (
            <button type='button' className='btn btn-warning' onClick={startPublish}>
              Publish
            </button>
          )}
          {user?.status === AccountStatus.NOT_PAID && (
            <button type='button' className='btn btn-danger' onClick={goToPayment}>
              Pay subscription
            </button>
          )}
          <span className='text-white m-3'>{user.username}</span>
          <button onClick={handleLogout} type='button' className='btn btn-primary'>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link onClick={handleLogout} type='button' className='btn btn-primary' to='/register'>
            Register as reader
          </Link>
          <Link
            onClick={handleLogout}
            type='button'
            className='btn btn-primary'
            to='/register/writer'>
            Register as writer
          </Link>
          <Link onClick={handleLogout} type='button' className='btn btn-primary' to='/login'>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
