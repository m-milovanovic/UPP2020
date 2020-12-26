import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProcessService from '../services/ProcessService';

interface Params {
  id: string;
}

const ActivateUser = () => {
  const { id } = useParams<Params>();

  const [activated, setActivated] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const activateUser = async () => {
      try {
        setActivated(await ProcessService.sendMessage(id, 'ActivationLinkClicked'));
      } catch (error) {
        setError(true);
      }
    };
    if (id) {
      activateUser();
    }
  }, [id]);

  return (
    <div>
      {activated && !error ? (
        <div className='alert alert-success mx-auto my-5 w-25' role='alert'>
          <p className='text-center'>You have succesfully activated your account</p>
          <Link to='/login'>
            <p className='text-center'>Proceed to login page</p>
          </Link>
        </div>
      ) : (
        <div className='alert alert-danger mx-auto my-5 w-25' role='alert'>
          There was an error. Please try again
        </div>
      )}
    </div>
  );
};

export default ActivateUser;
