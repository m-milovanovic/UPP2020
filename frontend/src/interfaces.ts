export interface FormVariables {
  variables: Record<string, FormVariable>;
}

export interface FormVariablesPOST {
  variables: Record<string, FormVariablePOST>;
}

export type FormVariable = {
  inputType: string;
  label: string;
  name: string;
  constraints: Constraints;
  value: any;
  options?: any[];
};

export type FormVariablePOST = Pick<FormVariable, 'value'>;

export type Constraints = Record<string, string[] | undefined>;
