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

const getReviewers = () => {
  client.subscribe('getReviewers', async function ({ task, taskService }) {
    console.log('Get reviewers');
    await taskService.complete(task);
  });
};

const sendNotification = () => {
  client.subscribe('sendNotification', async function ({ task, taskService }) {
    console.log('Send notification');
    await taskService.complete(task);
  });
};

const deactivateWriter = () => {
  client.subscribe('deactivateWriter', async function ({ task, taskService }) {
    console.log('Deactivate writer');
    await taskService.complete(task);
  });
};

export default {
  createWriter,
  activateWriter,
  getReviewers,
  sendNotification,
  deactivateWriter
};
