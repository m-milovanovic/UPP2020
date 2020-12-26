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
  error?: string;
};

type ValueInfo = {
  filename: string;
  mimetype: string;
  encoding: string;
};

export interface Task {
  id: string;
  name: string;
}

export type Constraints = Record<string, string[] | undefined>;

export enum AccountStatus {
  NOT_ACTIVATED = 'Not activated',
  NOT_APPROVED = 'Not approved',
  NOT_PAID = 'Not paid',
  DECLINED = 'Declined',
  ACTIVATED = 'Activated',
}
