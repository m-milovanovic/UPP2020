import React from 'react';

export interface GenericFormFieldProps {
  type: string;
  label: string;
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenericFormField: React.FC<GenericFormFieldProps> = ({
  type,
  label,
  value,
  name,
  onChange,
}) => {
  return (
    <div>
      {type === 'String' && (
        <label>
          {label}
          <input type='string' value={value} name={name} onChange={onChange} />
        </label>
      )}
      {type === 'Boolean' && (
        <label>
          {label}
          <input type='checkbox' checked={value} name={name} onChange={onChange} />
        </label>
      )}
    </div>
  );
};

export default GenericFormField;
