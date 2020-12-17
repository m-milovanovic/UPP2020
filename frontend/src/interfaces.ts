export interface FormVariables {
  variables: Record<string, FormVariable>;
}

export type FormVariable = {
  inputType: string;
  label: string;
  name: string;
  constraints: Constraints;
  value: any;
  options?: any[];
  type?: string;
  valueInfo?: ValueInfo;
};

type ValueInfo = {
  filename: string;
  mimetype: string;
  encoding: string;
};

export type Constraints = Record<string, string[] | undefined>;
