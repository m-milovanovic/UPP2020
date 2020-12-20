import express from "express";
import Task from "../../camunda-engine/Task";
import VariableInstance from "../../camunda-engine/VariableInstance";
import EnumService from "../../services/EnumService";

const router = express.Router();

type Constraints = Record<string, string>;

interface FormVariable {
  name: string;
  inputType: string;
  label: string;
  constraints: Constraints;
  options?: any[];
}

router.get("/:id/formVariables", async (request, response) => {
  const taskID = request.params.id;
  const fieldsObject = await VariableInstance.getVariable(taskID);
  fieldsObject.value = fieldsObject.value.replaceAll('"', '"');
  const retVal = tranformStringToFormVariable(fieldsObject.value);
  response.json(retVal);
});

router.get("/myTasks/:id", async (request, response) => {
  const username = request.params.id;
  response.json(await Task.getAssignedTasks(username));
});

router.post("/:id/complete", async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  await Task.complete(id, data);
  response.status(204).end();
});

const tranformStringToFormVariable = (str: string): FormVariable[] => {
  const fieldList = JSON.parse(str);
  let retVal: FormVariable[] = fieldList.map((field) => {
    let constraints: Record<string, string> = {};
    field.validationConstraints.forEach(
      (cons) => (constraints[cons.name] = cons.configuration)
    );
    const variable = <FormVariable>{
      name: <string>field.id,
      inputType: <string>(
        (field.properties.inputType
          ? field.properties.inputType
          : field.type.name)
      ),
      label: <string>field.label,
      constraints: constraints,
    };
    if (field.properties.inputType === "multiselect") {
      variable.options = EnumService.getOptions(field.properties.options);
    } else if (field.type.values) {
      variable.options = Object.keys(field.type.values);
    }
    return variable;
  });
  return retVal;
};

export default router;
