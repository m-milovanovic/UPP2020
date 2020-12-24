import express from 'express';
import Task from '../../camunda-engine/Task';
import VariableInstance from '../../camunda-engine/VariableInstance';
import EnumService from '../../services/EnumService';
import ValidationService from '../../services/ValidationService';
import { FormVariable } from '../../types';

const router = express.Router();

router.get('/:id/formVariables', async (request, response) => {
  const taskID = request.params.id;
  const fieldsObject = await VariableInstance.getVariable(taskID);
  fieldsObject.value = fieldsObject.value.replaceAll('"', '"');
  const formVariables = tranformStringToFormVariable(fieldsObject.value);
  response.json(formVariables);
});

router.get('/myTasks/:id', async (request, response) => {
  const username = request.params.id;
  response.json(await Task.getAssignedTasks(username));
});

router.post('/:id/complete', async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  const fieldsObject = await VariableInstance.getVariable(id);
  fieldsObject.value = fieldsObject.value.replaceAll('"', '"');
  const formVariables = tranformStringToFormVariable(fieldsObject.value);
  const errors = await ValidationService.validateConstraints(data.variables, formVariables);
  if (Object.keys(errors).length > 0) {
    response.status(400).json(errors);
  } else {
    await Task.complete(id, data);
    response.status(204).end();
  }
});

const tranformStringToFormVariable = (str: string): FormVariable[] => {
  const fieldList = JSON.parse(str);
  let retVal: FormVariable[] = fieldList.map((field) => {
    let constraints: Record<string, string> = {};
    field.validationConstraints.forEach((cons) => (constraints[cons.name] = cons.configuration));
    if(field.properties.pattern) {
      constraints.pattern = field.properties.pattern
    }
    const variable = <FormVariable>{
      name: <string>field.id,
      inputType: <string>(
        (field.properties.inputType ? field.properties.inputType : field.type.name)
      ),
      label: <string>field.label,
      constraints: constraints,
      unique: field.properties.unique,
    };
    if (field.properties.inputType === 'multiselect') {
      variable.options = EnumService.getOptions(field.properties.options);
    } else if (field.type.values) {
      variable.options = Object.keys(field.type.values);
    }
    return variable;
  });
  return retVal;
};

export default router;
