import { Link, useHistory } from 'react-router-dom';
import { AccountStatus } from '../interfaces';
import ProcessService from '../services/ProcessService';

interface HeaderProps {
  user: any;
  handleLogout: any;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {
  const history = useHistory();  

  const goToPayment = () => {
    history.push('/payment');
  };

  const startProcess = (processName: string) => async () =>{
    const processId = await ProcessService.startProcess(processName, user.username);
    const activeTaskId = await ProcessService.getActiveTaskId(processId);
    if (activeTaskId) {
      history.push(`/user/tasks/${activeTaskId}`);
    } else {
      history.push('/user');
    }
  };

  

  return (
    <nav className='navbar navbar-dark bg-primary justify-content-between p-2'>
      <Link className='navbar-brand' to={'/'}>
        Home
      </Link>
      {user ? (
        <div>
          {user?.type && user?.type !== 'writer' && (
            <>
              <button type='button' className='btn btn-warning' onClick={startProcess('reportPlagiarism')}>
                Report plagiarism
              </button>
            </>
          )}
          {user?.type === 'writer' && user?.status === AccountStatus.ACTIVATED && (
            <>
              <button type='button' className='btn btn-warning m-3' onClick={startProcess('publishBook')}>
                Publish
              </button>
              <button type='button' className='btn btn-warning' onClick={startProcess('reportPlagiarism')}>
                Report plagiarism
              </button>
            </>
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
