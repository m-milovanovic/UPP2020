import { Variables } from 'camunda-external-task-client-js';
import client from '../CamundaClient';
import { BoardMember } from '../entities/BoardMember';
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
  client.subscribe('getBoardMembers', async function ({ task, taskService }) {
    console.log('Get board members');
    const boardMembers = await BoardMember.find({ take: 3 });
    const variables = new Variables();
    variables.set(
      'boardMembersExt',
      boardMembers.map((bm) => bm.username)
    );
    await taskService.complete(task, variables);
  });
};

const approveWriter = () => {
  client.subscribe('approveWriter', async function ({ task, taskService }) {
    console.log('Approve writer');
    const username = task.variables.get('username');
    await WriterService.approveWriter(username);
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
  approveWriter,
  sendNotification,
  deactivateWriter,
};
