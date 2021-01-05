import { Variables } from 'camunda-external-task-client-js';
import client from '../CamundaClient';

const getEditor = () => {
  client.subscribe('getEditor', async function ({ task, taskService }) {
    console.log('Get editor');
    const variables = new Variables();
    variables.set('editor', 'board3');
    await taskService.complete(task, variables);
  });
};

const notifyMainAutor = () => {
  client.subscribe('notifyMainAutor', async function ({ task, taskService }) {
    console.log('Notify main editor');
    await taskService.complete(task);
  });
};

export default {
  notifyMainAutor,
  getEditor
};
