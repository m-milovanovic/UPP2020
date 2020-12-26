import { Link, useHistory } from 'react-router-dom';
import { AccountStatus } from '../interfaces';
import LocalStorageService from '../services/LocalStorageService';

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

  console.log(user);

  return (
    <nav className='navbar navbar-dark bg-primary justify-content-between p-2'>
      <Link className='navbar-brand' to={'/'}>
        Home
      </Link>
      {user ? (
        <div>
          {user?.status === AccountStatus.NOT_PAID && (
            <button type='button' className='btn btn-warning'>
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
