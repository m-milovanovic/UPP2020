import React from 'react';
import { FormVariable } from '../interfaces';
import { fileToBase64 } from '../utils/convert';

/*
export interface GenericFormFieldProps {
  inputType: string;
  label: string;
  value: any;
  name: string;
  constraints?: Constraints;
  options?: any[];
  setFormState: (name: string, value: any) => void;
}
*/

export interface GenericFormFieldProps {
  formField: FormVariable;
  setFormState: (name: string, value: any) => void;
}

const GenericFormField: React.FC<GenericFormFieldProps> = ({ formField, setFormState }) => {
  const { constraints, inputType, label, name, value, options, error } = formField;

  const onChange = async (e: React.ChangeEvent) => {
    let variable: FormVariable = { ...formField };
    switch (formField.inputType) {
      case 'string':
      case 'password':
      case 'email':
        variable.value = (e.target as HTMLInputElement).value;
        break;
      case 'number':
        variable.value = +(e.target as HTMLInputElement).value;
        break;
      case 'boolean':
      case 'checkbox':
        variable.value = (e.target as HTMLInputElement).checked;
        break;
      case 'multiselect':
        variable.value = Array.from(
          (e.target as HTMLSelectElement).selectedOptions,
          (option) => option.value
        );
        break;
      case 'enum':
        variable.value = (e.target as HTMLSelectElement).value;
        break;
      case 'file':
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          variable.value = await fileToBase64(file);
          variable.type = 'File';
          variable.valueInfo = {
            filename: file.name,
            mimetype: file.type,
            encoding: 'UTF-8',
          };
        }
        break;
      case 'multifile':
        const files = (e.target as HTMLInputElement).files;
        variable.value = [];
        if (files) {
          for (const file of files) {
            variable.value.push({
              value: await fileToBase64(file),
              type: 'File',
              valueInfo: {
                filename: file.name,
                mimetype: file.type,
                encoding: 'UTF-8',
              },
            });
          }
        }
        /*
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          variable.value = await fileToBase64(file);
          variable.type = 'File';
          variable.valueInfo = {
            filename: file.name,
            mimetype: file.type,
            encoding: 'UTF-8',
          };
        }
        */
        break;
      default:
        return;
    }
    setFormState(formField.name, variable);
  };

  return (
    <div className='form-group my-3'>
      {inputType === 'string' && (
        <input
          type='string'
          className='form-control'
          value={value}
          name={name}
          onChange={onChange}
          placeholder={label}
          {...constraints}
        />
      )}
      {(inputType === 'number' || inputType === 'long') && (
        <input
          type='number'
          className='form-control'
          value={value}
          name={name}
          onChange={onChange}
          placeholder={label}
          {...constraints}
        />
      )}
      {(inputType === 'checkbox' || inputType === 'boolean') && (
        <label className='form-check-label'>
          {label}
          <input
            type='checkbox'
            className='form-check-input'
            checked={value}
            name={name}
            onChange={onChange}
            {...constraints}
          />
        </label>
      )}
      {inputType === 'password' && (
        <input
          type='password'
          className='form-control'
          value={value}
          name={name}
          onChange={onChange}
          placeholder={label}
          {...constraints}
        />
      )}
      {inputType === 'email' && (
        <input
          type='email'
          className='form-control'
          value={value}
          name={name}
          onChange={onChange}
          placeholder={label}
          {...constraints}
        />
      )}
      {inputType === 'file' && (
        <label>
          {label}
          <input type='file' name={name} onChange={onChange} {...constraints} />
        </label>
      )}
      {inputType === 'multifile' && (
        <label>
          {label}
          <input type='file' name={name} onChange={onChange} {...constraints} multiple />
        </label>
      )}
      {inputType === 'multiselect' && (
        <>
          <label>{label}</label>
          <select className='form-select' name={name} multiple onChange={onChange} {...constraints}>
            <option value=''></option>
            {options?.map((opt, i) => (
              <option key={`multiselect-opt-${i}`} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </>
      )}
      {inputType === 'enum' && (
        <>
          <label>{label}</label>
          <select className='form-select' name={name} onChange={onChange} {...constraints}>
            <option value=''></option>
            {options?.map((opt, i) => (
              <option key={`enum-opt-${i}`} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </>
      )}
      {error && <small className='text-danger'>{error}</small>}
    </div>
  );
};

export default GenericFormField;
