import React, { SyntheticEvent } from 'react';
import { FormVariable, FormVariables } from '../interfaces';
import GenericFormField from './GenericFormField';
import GenericAdditionalData from './GenericAdditionalData';
import logo from '../images/book_logo.png';

interface GenericFormProps {
  setFormState: any;
  formState: FormVariables;
  handleSubmit: (e: SyntheticEvent) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ formState, setFormState, handleSubmit }) => {
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
      {formState.additionalData ? (
        <>
          <div className='col-lg-4 col-md-4 col-sm-12 bg-white p-0'>
            <img src={logo} alt='' className='w-100 float rounded' />
          </div>
          <div className='col bg-white p-3'>
            <GenericAdditionalData additionalData={formState.additionalData} />
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12 px-4 bg-white'>
            <form onSubmit={handleSubmit}>
              {fields.map((formField, i) => (
                <GenericFormField key={i} formField={formField} setFormState={handleSetState} />
              ))}
              <button type='submit' className='btn btn-primary w-100 mb-3'>
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className='col-lg-6 col-md-6 col-sm-12 bg-white p-0'>
            <img src={logo} alt='' className='w-100 float rounded' />
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
        </>
      )}
    </div>
  );
};

export default GenericForm;
