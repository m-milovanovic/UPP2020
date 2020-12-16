import express from 'express';
import ProcessDefinition from '../../camunda-engine/ProcessDefinition';
import ProcessInstance from '../../camunda-engine/ProcessInstance';
import Task from '../../camunda-engine/Task';

const router = express.Router();

type Constraint = Record<string, string>

interface FormVariable {
  name: string,
  inputType: string,
  label: string,
  constraints: Constraint[]
}

router.post("", async (_, response) => {
  const key = "registerReader";
  const processInstanceInfo = await ProcessDefinition.startProcessInstance(key);
  const processInstanceID = processInstanceInfo.id;
  // only one task of this kind will exsist
  const taskID = (await Task.getTask(processInstanceID, "FillDataReader"))[0].id;
  const fieldsObject = await ProcessInstance.getVariable(processInstanceID, "formDataJSONString");
  fieldsObject.value = fieldsObject.value.replaceAll('"', '\"');
  const retVal = tranformStringToFormVariable(fieldsObject.value);
  response.json({ taskID, properties: retVal });
})

router.post("complete", async (request, _) => {
  const body = request.body;
  console.log(body.variables);
})

const tranformStringToFormVariable = (str: string): FormVariable[] => {
  const fieldList = JSON.parse(str);
  let retVal: FormVariable[] = fieldList.map(field => {
    return <FormVariable>{
      name: <string>field.id,
      inputType: <string>(!field.properties.inputType ? field.properties.inputType : field.type.name),
      label: <string>field.label,
      constraints: field.validationConstraints.map(cons => {
        return <Constraint>{
          name: <string>cons.name,
          configuration: <string>cons.configuration
        }
      })
    };
  })
  return retVal;
}

export default router;
