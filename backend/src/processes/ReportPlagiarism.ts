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
  })
};

const getEditorsDataPlagiarism = () => {
  client.subscribe('getEditorsDataPlagiarism', async function() {
    const variables = new Variables();
    variables.set('assignedEditors', []);

    //await taskService.complete(task, variables)
  })
}

export default {
  getDataPlagiarism,
  getEditorsDataPlagiarism
}