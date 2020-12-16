import React, { SyntheticEvent } from 'react';
import { FormVariables } from '../interfaces';
import GenericFormField from './GenericFormField';

interface GenericFormProps {
  setFormState: any;
  formState: FormVariables;
  handleSubmit: (e: SyntheticEvent) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ formState, setFormState, handleSubmit }) => {
  const handleSetState = (name: string, value: any) => {
    setFormState({
      ...formState,
      variables: {
        ...formState.variables,
        [name]: { ...formState.variables[name], value: value },
      },
    });
  };

  const fields = [];
  for (const key in formState.variables) {
    fields.push({ ...formState.variables[key] });
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((formField, i) => (
        <GenericFormField key={i} {...formField} setFormState={handleSetState} />
      ))}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default GenericForm;
