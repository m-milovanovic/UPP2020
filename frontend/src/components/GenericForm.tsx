import React, { SyntheticEvent } from 'react';
import { FormVariables } from '../interfaces';
import GenericFormField from './GenericFormField';

interface GenericFormProps {
  setFormState: any;
  formState: FormVariables;
  handleSubmit: (e: SyntheticEvent) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  children,
  formState,
  setFormState,
  handleSubmit,
}) => {
  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: any;
    switch (e.target.type) {
      case 'text':
      case 'password':
        value = e.target.value;
        break;
      case 'checkbox':
        value = e.target.checked;
        break;
      default:
    }
    setFormState({
      ...formState,
      variables: { ...formState.variables, [name]: { ...formState.variables[name], value: value } },
    });
  };

  const fields = [];

  for (const key in formState.variables) {
    fields.push({
      type: formState.variables[key].type,
      label: formState.variables[key].label,
      name: formState.variables[key].name,
      value: formState.variables[key].value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((formField, i) => (
        <GenericFormField
          key={i}
          type={formField.type}
          label={formField.label}
          value={formField.value}
          name={formField.name}
          onChange={handleChange(formField.name)}
        />
      ))}
      {children}
      <button type='submit'>Register</button>
    </form>
  );
};

export default GenericForm;
