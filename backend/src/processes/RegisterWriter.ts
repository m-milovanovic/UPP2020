import client from '../CamundaClient';
import { Writer } from '../entities/Writer';
import WriterService from '../services/WriterService';

const createWriter = () =>
  client.subscribe('createWriter', async function ({ task, taskService }) {
    console.log('create writer');
    let writer: Writer = new Writer({
      firstName: task.variables.get('firstName'),
      lastName: task.variables.get('lastName'),
      username: task.variables.get('username'),
      password: task.variables.get('password'),
      email: task.variables.get('email'),
      favoriteGenres: JSON.parse(task.variables.get('favoriteGenres')),
    });
    WriterService.save(writer);
    await taskService.complete(task);
  });

const confirmWritersMail = () => {
  client.subscribe('confirmWritersMail', async function ({ task, taskService }) {
    console.log('Confirm writers mail');
    const username = task.variables.get('username');
    await WriterService.confirmWritersMail(username);
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
  confirmWritersMail,
  getReviewers,
  sendNotification,
  deactivateWriter
};
