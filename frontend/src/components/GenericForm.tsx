import React, { SyntheticEvent } from 'react';
import { FormVariable, FormVariables } from '../interfaces';
import GenericFormField from './GenericFormField';
import logo from '../images/book_logo.png';

interface GenericFormProps {
  setFormState: any;
  formState: FormVariables;
  handleSubmit: (e: SyntheticEvent) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  formState,
  setFormState,
  handleSubmit,
}) => {
  const handleSetState = (name: string, variable: any) => {
    setFormState({
      ...formState,
      variables: {
        ...formState.variables,
        [name]: { ...variable },
      },
    });
  };

  const fields: FormVariable[] = [];
  for (const key in formState.variables) {
    fields.push({ ...formState.variables[key] });
  }

  return (
    <div className='row justify-content-between container mx-auto'>
      <div className='col bg-white p-0'>
        <img className='rounded h-100' src={logo} alt='' />
      </div>
      <div className='col px-4 bg-white'>
        <form onSubmit={handleSubmit}>
          {fields.map((formField, i) => (
            <GenericFormField key={i} formField={formField} setFormState={handleSetState} />
          ))}
          <button type='submit' className='btn btn-primary w-100 mb-3'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenericForm;
