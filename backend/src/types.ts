export type Constraints = Record<string, string>;

export interface FormVariable {
  name: string;
  inputType: string;
  label: string;
  constraints: Constraints;
  options?: any[];
  unique?: string;
  minSize?: number;
}
