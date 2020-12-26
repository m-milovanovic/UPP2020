import { Link, useHistory } from 'react-router-dom';
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
  
  return (
    <nav className='navbar navbar-dark bg-primary justify-content-between p-2'>
      <div className='navbar-brand'>Navbar</div>
      {user ? (
        <button onClick={handleLogout} type='button' className='btn btn-primary'>
          Logout
        </button>
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
