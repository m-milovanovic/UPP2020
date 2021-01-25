import express from 'express';
import Task from '../camunda-engine/Task';
import VariableInstance from '../camunda-engine/VariableInstance';
import EnumService from '../services/EnumService';
import ValidationService from '../services/ValidationService';
import { FormVariable } from '../types';

const router = express.Router();

router.get('/id/:id', async (request, response) => {
  const taskID = request.params.id;
  const task = await Task.getTaskById(taskID);
  if (!task) {
    response.status(404).end();
    return;
  }
  if (task.assignee && task.assignee !== request['userInfo'].username) {
    response.status(401).end();
    return;
  }
  response.json(task);
});

router.get('/:id/formVariables', async (request, response) => {
  const taskID = request.params.id;
  const task = await Task.getTaskById(taskID);
  if (!task) {
    response.status(404).end();
    return;
  }
  if (task.assignee && task.assignee !== request['userInfo'].username) {
    response.status(401).end();
    return;
  }
  const fieldsObject = await VariableInstance.getVariable(taskID);
  fieldsObject.value = fieldsObject.value.replaceAll('"', '"');
  const formVariables = await tranformStringToFormVariable(fieldsObject.value);
  response.json(formVariables);
});

router.get('/myTasks', async (request, response) => {
  const username = request['userInfo'].username;
  response.json(await Task.getAssignedTasks(username));
});

router.post('/:id/complete', async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  const task = await Task.getTaskById(id);
  if (!task) {
    response.status(404).end();
    return;
  }
  if (task.assignee && task.assignee !== request['userInfo'].username) {
    response.status(401).end();
    return;
  }
  const fieldsObject = await VariableInstance.getVariable(id);
  fieldsObject.value = fieldsObject.value.replaceAll('"', '"');
  const formVariables = await tranformStringToFormVariable(fieldsObject.value);
  const errors = await ValidationService.validateConstraints(data.variables, formVariables);
  if (Object.keys(errors).length > 0) {
    response.status(400).json(errors);
  } else {
    await Task.complete(id, data);
    response.status(204).end();
  }
});

const tranformStringToFormVariable = async (str: string): Promise<FormVariable[]> => {
  const fieldList = JSON.parse(str);
  let retVal: FormVariable[]= await Promise.all(fieldList.map(async (field) => {
    let constraints: Record<string, string> = {};
    field.validationConstraints.forEach((cons) => (constraints[cons.name] = cons.configuration));
    if (field.properties.pattern) {
      constraints.pattern = field.properties.pattern;
    }
    const variable = <FormVariable>{
      name: <string>field.id,
      inputType: <string>(
        (field.properties.inputType ? field.properties.inputType : field.type.name)
      ),
      label: <string>field.label,
      constraints: constraints,
      value: field.defaultValue,
    };
    if (field.properties.unique) {
      variable.unique = field.properties.unique;
    }
    if (field.properties.minSize && !isNaN(+field.properties.minSize)) {
      variable.minSize = +field.properties.minSize;
    }
    if (field.type.values && Object.keys(field.type.values).length > 0) {
      variable.options = Object.keys(field.type.values);
    } else if (field.type.values || field.properties.inputType === 'multiselect' || field.properties.inputType === 'enum') {
      variable.options = await EnumService.getOptions(field.properties.options);
    }
    return variable;
  }));
  return retVal;
};

export default router;
