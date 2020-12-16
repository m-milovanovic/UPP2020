import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormVariables } from '../interfaces';
import FormService from '../services/FormService';
import UserService from '../services/UserService';
import GenericForm from './GenericForm';

const RegisterReaderForm: React.FC = () => {
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });

  useEffect(() => {
    const getFormVariables = async () => {
      setFormState(await FormService.getFormVariables('registerReader'));
    };
    const getGenres = async () => {
      const genres: string[] = await FormService.getGenres();
      setFormState({
        ...formState,
        variables: {
          ...formState.variables,
          genres: {
            ...formState.variables.genres,
            constraints: {
              ...formState.variables.genres.constraints,
              options: genres,
            },
          },
        },
      });
    };
    getFormVariables();
    getGenres();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await UserService.registerReader(formState, 'registerReader');
  };

  return (
    <div>
      <GenericForm
        formState={formState}
        setFormState={setFormState}
        handleSubmit={handleSubmit}
        buttonName='Register'
      />
    </div>
  );
};

export default RegisterReaderForm;
