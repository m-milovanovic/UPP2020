import client from '../CamundaClient';

const createWriter = () =>
  client.subscribe('createWriter', async function ({ task, taskService }) {
    console.log('create writer');
    await taskService.complete(task);
  });

const activateWriter = () => {
  client.subscribe('activateWriter', async function ({ task, taskService }) {
    console.log('Activate writer');
    await taskService.complete(task);
  });
};

export default {
  createWriter,
  activateWriter,
};
