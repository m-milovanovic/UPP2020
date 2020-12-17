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
        <div>
          <div>You have succesfully activated your account</div>
          <Link to='/login'>Proceed to login page</Link>
        </div>
      ) : (
        <div>Registration complete! Check your email for the activation link</div>
      )}
    </div>
  );
};

export default ActivateUser;
