import client from '../CamundaClient';
import MailService from '../services/MailService';
import ReaderService from '../services/ReaderService';
import { Reader } from '../entities/Reader';

const createReader = () =>
  client.subscribe('createReader', async function ({ task, taskService }) {
    let reader: Reader = new Reader({
      firstName: task.variables.get('firstName'),
      lastName: task.variables.get('lastName'),
      username: task.variables.get('username'),
      password: task.variables.get('password'),
      email: task.variables.get('email'),
      beta: task.variables.get('betaReader'),
      favoriteGenres: JSON.parse(task.variables.get('favoriteGenres')),
      genres: task.variables.get('betaReader') ? JSON.parse(task.variables.get('genres')) : undefined
    });
    ReaderService.save(reader);
    await taskService.complete(task);
  });

const sendActivation = () => {
  client.subscribe('sendActivation', async function ({ task, taskService }) {
    console.log('Send activation');
    const processID = task.variables.get('processID');
    const email = task.variables.get('email');
    MailService.send(email, processID);
    await taskService.complete(task);
  });
};

const activateReader = () => {
  client.subscribe('activateReader', async function ({ task, taskService }) {
    const username = task.variables.get('username');
    await ReaderService.activateAccount(username);
    await taskService.complete(task);
  });
};

export default {
  createReader,
  sendActivation,
  activateReader,
};
