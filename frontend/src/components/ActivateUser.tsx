import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProcessService from '../services/ProcessService';

interface Params {
  id: string;
}

const ActivateUser = () => {
  const { id } = useParams<Params>();

  const [activated, setActivated] = useState<boolean>(false);

  useEffect(() => {
    const activateUser = async () => {
      setActivated(await ProcessService.sendMessage(id, 'ActivationLinkClicked'));
    };
    if (id) {
      activateUser();
    }
  }, [id]);

  return (
    <div>
      {activated ? (
        <div className="alert alert-success mx-auto my-5 w-25" role="alert">
          <p className="text-center">
            You have succesfully activated your account
          </p>
          <Link to='/login'>
            <p className="text-center">
              Proceed to login page
            </p>
          </Link>
        </div>
      ) : (
          <div className="alert alert-success mx-auto my-5 w-25" role="alert">
            Registration complete! Check your email for the activation link
          </div>
        )}
    </div>
  );
};

export default ActivateUser;
