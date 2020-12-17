import React, { SyntheticEvent } from 'react';
import { FormVariable, FormVariables } from '../interfaces';
import GenericFormField from './GenericFormField';

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
    <form onSubmit={handleSubmit}>
      {fields.map((formField, i) => (
        <GenericFormField key={i} formField={formField} setFormState={handleSetState} />
      ))}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default GenericForm;
