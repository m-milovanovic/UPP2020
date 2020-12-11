export interface FormVariables {
  variables: Record<string, FormVariable>;
}

export interface FormVariable {
  value: any;
  type?: string;
  name: string;
  label: string;
  constraints?: Constraints;
}

export type Constraints = Record<string, string | boolean | undefined>
