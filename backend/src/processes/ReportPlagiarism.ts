import { Variables } from 'camunda-external-task-client-js';
import client from '../CamundaClient';
import StaffService from '../services/StaffService';

const getDataPlagiarism = () => {
  client.subscribe('getDataPlagiarism', async function ({ task, taskService }) {
    const variables = new Variables();
    const mainEditor = await StaffService.findMainEditor();
    variables.set('mainEditor', mainEditor.username);
    variables.set('mainEditorMail', mainEditor.email);

    await taskService.complete(task, variables);
  });
};

const getEditorsDataPlagiarism = () => {
  client.subscribe('getEditorsDataPlagiarism', async function ({ task, taskService }) {
    const variables = new Variables();
    const assignedEditorsUsername = await task.variables.get('editor');
    const assignedEditor = await StaffService.findEditorByUsername(assignedEditorsUsername);
    variables.set(`notificationEmail`, assignedEditor.email);
    await taskService.complete(task, variables);
  });
};

export default {
  getDataPlagiarism,
  getEditorsDataPlagiarism,
};
