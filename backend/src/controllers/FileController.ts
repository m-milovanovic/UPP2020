import express from "express";
import VariableInstance from "../camunda-engine/VariableInstance";
//import { CAMUNDA_API } from "../config/config";

const router = express.Router();

router.get("/:id", async (request, response) => {
  try {
    const processId = request.params.id;
    const variables = await VariableInstance.getVariables("review%", processId);
    response
      .json(
        variables.map((variable) => {
          return {
            name: variable.name,
            id: variable.id,
          };
        })
      )
      .end();
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/download/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const variable = await VariableInstance.getVariableById(id);
    response.setHeader(
      "Content-Disposition",
      `inline; filename="${variable.valueInfo.filename}"`
    );
    (await VariableInstance.getVariableDataStream(id)).pipe(response);
  } catch (error) {
    response.status(400).json(error);
  }
});

export default router;
