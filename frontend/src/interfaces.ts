export interface FormVariables {
  variables: Record<string, FormVariable>;
}

export interface FormVariable {
  inputType: string;
  label: string;
  name: string;
  constraints: Constraints;
  value: any;
}

export interface FormVariablePOST {
  value: any;
}

export type Constraints = Record<string, string[] | string | undefined >;
