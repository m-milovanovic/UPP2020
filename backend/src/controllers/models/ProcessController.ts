import express from 'express';
import ProcessDefinition from '../../camunda-engine/ProcessDefinition';
import Task from '../../camunda-engine/Task';

const router = express.Router();

router.get('/:key/start', async (request, response) => {
  const key = request.params.key;
  const processInstanceInfo = await ProcessDefinition.startProcessInstance(key);
  response.json(processInstanceInfo.id);
});

router.get('/:id/activeTask', async (request, response) => {
  const id = request.params.id;
  const taskId = (await Task.getTask(id))[0].id;
  response.json(taskId);
});

export default router;
