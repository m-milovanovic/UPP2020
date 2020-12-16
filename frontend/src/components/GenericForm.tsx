import React, { SyntheticEvent } from 'react';
import { FormVariables } from '../interfaces';
import GenericFormField from './GenericFormField';

interface GenericFormProps {
  setFormState: any;
  formState: FormVariables;
  handleSubmit: (e: SyntheticEvent) => void;
  buttonName: string
}

const GenericForm: React.FC<GenericFormProps> = ({
  children,
  formState,
  setFormState,
  handleSubmit,
  buttonName
}) => {
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
        <GenericFormField
          key={i}
          inputType={formField.inputType}
          label={formField.label}
          value={formField.value}
          name={formField.name}
          constraints={formField.constraints}
          setFormState={handleSetState}
        />
      ))}
      {children}
      <button type='submit'>{buttonName}</button>
    </form>
  );
};

export default GenericForm;
