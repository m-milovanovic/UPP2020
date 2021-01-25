import { FormVariable } from '../types';
import resolveTable from '../util/resolveTable';

const validateConstraints = async (data: any, variables: FormVariable[]) => {
  const errors = {};
  for (const variable of variables) {
    for (const key in variable.constraints) {
      switch (key) {
        case 'required':
          if (
            !data.hasOwnProperty(variable.name) ||
            !data[variable.name].value ||
            data[variable.name].value.length == 0
          ) {
            errors[variable.name] = `${variable.name} is required`;
          }
          break;
        case 'minlength':
          if (data[variable.name]?.value.length < variable.constraints[key]) {
            errors[
              variable.name
            ] = `${variable.name} length cannot be less than ${variable.constraints[key]}`;
          }
          break;
        case 'maxlength':
          if (data[variable.name]?.value.length > variable.constraints[key]) {
            errors[
              variable.name
            ] = `${variable.name} length cannot be greater than ${variable.constraints[key]}`;
          }
          break;
        case 'max':
          if (data[variable.name]?.value > variable.constraints[key]) {
            errors[
              variable.name
            ] = `${variable.name} value cannot be less than ${variable.constraints[key]}`;
          }
          break;
        case 'min':
          if (data[variable.name]?.value < variable.constraints[key]) {
            errors[
              variable.name
            ] = `${variable.name} value cannot be greater than ${variable.constraints[key]}`;
          }
          break;
        case 'pattern':
          if (
            data[variable.name]?.value.match(new RegExp(variable.constraints[key]))[0].length === 0
          ) {
            errors[
              variable.name
            ] = `${variable.name} value must match pattern ${variable.constraints[key]}`;
          }
          break;
      }
    }
    if (variable.unique) {
      const entity = resolveTable(variable.unique);
      const varName = variable.name;
      const varValue = data[variable.name].value;
      const item = await entity.findOne({ [varName]: varValue });
      if (item) {
        errors[varName] = `${varName} ${varValue} already exists`;
      }
    }
    if (variable.options) {
      const value = data[variable.name]?.value;
<<<<<<< HEAD
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (!variable.options.includes(item)) {
              errors[variable.name] = `Enum value must be one of [${variable.options}]`;
            }
          });
        } else if (!variable.options.includes(value)) {
          errors[variable.name] = `Enum value must be one of [${variable.options}]`;
        }
=======
      console.log(variable.name);
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (!variable.options.includes(item)) {
            errors[variable.name] = `Enum value must be one of [${variable.options}]`;
          }
        });
      } else if (!variable.options.includes(value)) {
        errors[variable.name] = `Enum value must be one of [${variable.options}]`;
>>>>>>> plagiarismProcess
      }
    }
    if (variable.minSize) {
      const value = data[variable.name]?.value;
      console.log(variable.name);
      if (!Array.isArray(value) || value.length < variable.minSize) {
        errors[variable.name] = `Value must have length of ${variable.minSize}`;
      }
    }
  }
  return errors;
};

export default { validateConstraints };
