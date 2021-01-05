import express from 'express';
import ProcessDefinition from '../camunda-engine/ProcessDefinition';
import ProcessInstance from '../camunda-engine/ProcessInstance';
import Task from '../camunda-engine/Task';

const router = express.Router();

router.get('/:key/start', async (request, response) => {
  const key = request.params.key;
  let processInstanceInfo;
  if (request.query.username) {
    const variables = {
      username: { value: request.query.username },
    };
    processInstanceInfo = await ProcessDefinition.submitStartForm(key, {
      variables: variables,
    });
  } else {
    processInstanceInfo = await ProcessDefinition.startProcessInstance(key);
  }
  response.json(processInstanceInfo.id);
});

router.get('/:id/activeTask', async (request, response) => {
  const processId = request.params.id;
  const username = request['userInfo']?.username;
  const tasks = await Task.getTask(processId, username);
  if (!tasks.length) {
    response.status(204).end();
  } else {
    const taskId = tasks[0].id;
    response.json(taskId);
  }
});

router.post('/message', async (request, response) => {
  const { processId, messageName } = request.body;
  const flag = await ProcessInstance.sendMessage(processId, messageName);
  flag ? response.json(true).end() : response.status(400).end();
});

router.get('/variables', async (request, response) => {
  const { processId, messageName } = request.body;
  const flag = await ProcessInstance.sendMessage(processId, messageName);
  flag ? response.json(true).end() : response.status(400).end();
});

export default router;
