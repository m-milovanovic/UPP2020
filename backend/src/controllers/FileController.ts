import express from 'express';
import VariableInstance from '../camunda-engine/VariableInstance';

const router = express.Router();

router.get('/:id', async (request, response) => {
  try {
    const processId = request.params.id;
    const variables = await VariableInstance.getVariables('review%', processId);
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

router.get('/download/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const variable = await VariableInstance.getVariableById(id);
    const data = await VariableInstance.getVariableData(id);
    response
      .writeHead(200, {
        'Content-Disposition': `inline; filename="${variable.valueInfo.filename}"`,
        'Content-Type': variable.valueInfo.mimeType,
      })
      .end(data, 'binary');
  } catch (error) {
    response.status(400).json(error);
  }
});

export default router;
