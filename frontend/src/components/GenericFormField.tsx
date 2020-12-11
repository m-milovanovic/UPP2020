import React from "react";
import { Constraints } from "../interfaces";

export interface GenericFormFieldProps {
  type?: string;
  label: string;
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  constraints?: Constraints;
}

const GenericFormField: React.FC<GenericFormFieldProps> = ({
  type,
  label,
  value,
  name,
  onChange,
  constraints,
}) => {
  return (
    <div>
      {type === "String" && (
        <label>
          {label}
          <input
            type="string"
            value={value}
            name={name}
            onChange={onChange}
            {...constraints}
          />
        </label>
      )}
      {type === "Boolean" && (
        <label>
          {label}
          <input
            type="checkbox"
            checked={value}
            name={name}
            onChange={onChange}
            {...constraints}
          />
        </label>
      )}
      {type === "Password" && (
        <label>
          {label}
          <input
            type="password"
            value={value}
            name={name}
            onChange={onChange}
            {...constraints}
          />
        </label>
      )}
      {type === "Email" && (
        <label>
          {label}
          <input
            type="email"
            value={value}
            name={name}
            onChange={onChange}
            {...constraints}
          />
        </label>
      )}
    </div>
  );
};

export default GenericFormField;
