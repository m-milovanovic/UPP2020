import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormVariables } from '../interfaces';
import FormService from '../services/FormService';
import UserService from '../services/UserService';
import GenericForm from './GenericForm';

const RegisterReaderForm: React.FC = () => {
  const [formState, setFormState] = useState<FormVariables>({ variables: {} });
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const getFormVariables = async () => {
      setFormState(await FormService.getFormVariables('registerReader'));
    };
    const getGenres = async () => {
      setGenres(await FormService.getGenres());
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
        selectOptions={genres}
        buttonName='Register'
      />
    </div>
  );
};

export default RegisterReaderForm;
