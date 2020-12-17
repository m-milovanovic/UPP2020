import React from 'react';
import { Constraints } from '../interfaces';
import { fileToBase64 } from '../utils/convert';

export interface GenericFormFieldProps {
  inputType: string;
  label: string;
  value: any;
  name: string;
  constraints?: Constraints;
  options?: any[];
  setFormState: (name: string, value: any) => void;
}

const GenericFormField: React.FC<GenericFormFieldProps> = ({
  inputType,
  label,
  value,
  name,
  constraints,
  options,
  setFormState,
}) => {
  const onChange = async (e: React.ChangeEvent) => {
    let value;
    switch (inputType) {
      case 'string':
      case 'password':
      case 'email':
        value = (e.target as HTMLInputElement).value;
        break;
      case 'number':
        value = +(e.target as HTMLInputElement).value;
        break;
      case 'boolean':
      case 'checkbox':
        value = (e.target as HTMLInputElement).checked;
        break;
      case 'multiselect':
        value = Array.from(
          (e.target as HTMLSelectElement).selectedOptions,
          (option) => option.value
        );
        break;
      case 'file':
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          value = fileToBase64(file);
        }
        break;
      default:
    }
    setFormState(name, value);
  };

  return (
    <div>
      {inputType === 'string' && (
        <label>
          {label}
          <input type='string' value={value} name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {(inputType === 'number' || inputType === 'long') && (
        <label>
          {label}
          <input type='number' value={value} name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {(inputType === 'checkbox' || inputType === 'boolean') && (
        <label>
          {label}
          <input type='checkbox' checked={value} name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {inputType === 'password' && (
        <label>
          {label}
          <input type='password' value={value} name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {inputType === 'email' && (
        <label>
          {label}
          <input type='email' value={value} name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {inputType === 'file' && (
        <label>
          {label}
          <input type='file' value={value} name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {inputType === 'multiselect' && (
        <label>
          {label}
          <br />
          <select name={name} multiple onChange={onChange} {...constraints}>
            {options?.map((opt, i) => (
              <option key={`multiselect-opt-${i}`} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default GenericFormField;
