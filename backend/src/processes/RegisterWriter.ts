import { Variables } from 'camunda-external-task-client-js';
import { createNotificationMail } from '../../resources/notifications/RegisterWriter';
import client from '../CamundaClient';
import { Writer } from '../entities/Writer';
import MailService from '../services/MailService';
import WriterService from '../services/WriterService';
import StaffService from '../services/StaffService';

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
    const boardMembers = await StaffService.findBoardMembers();
    console.log('Checkpoint1');
    const variables = new Variables();
    const boardMembersCollection = boardMembers.map((bm) => bm.username);
    console.log(boardMembersCollection);
    variables.set('boardMembersExt', boardMembersCollection);
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
    const email = task.variables.get('notificationEmail');
    const subject = task.variables.get('notificationSubject');
    const notificationText = task.variables.get('notificationText');
    const html = createNotificationMail(notificationText);
    console.log('-----EMAIL-------');
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Content', html);
    console.log('-----------------');
    await MailService.send(email, subject, html);
    await taskService.complete(task);
  });
};

const deactivateWriter = () => {
  client.subscribe('deactivateWriter', async function ({ task, taskService }) {
    console.log('Deactivate writer');
    const username = task.variables.get('username');
    await WriterService.remove(username);
    await taskService.complete(task);
  });
};

const confirmWritersPayment = () => {
  client.subscribe('confirmWritersPayment', async function ({ task, taskService }) {
    console.log('Confirm writers payment');
    const username = task.variables.get('username');
    await WriterService.confirmWritersPayment(username);
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
  confirmWritersPayment,
};
