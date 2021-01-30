import client from '../CamundaClient';
import ProcessInstanceApi from '../camunda-engine/ProcessInstance';
import { Variables } from 'camunda-external-task-client-js';
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

const resetDataPlagiarism = () => {
  client.subscribe('resetDataPlagiarism', async function ({ task, taskService }) {
    const instanceId = await task.variables.get('instanceId');
    const assignedEditors = JSON.parse(await task.variables.get('assignedEditors'));
    let variablesToRemove = assignedEditors.map(editor => 'review_'+editor);
    variablesToRemove.push('assignedEditors');
    variablesToRemove.push('votes');
    await ProcessInstanceApi.removeVariableList(instanceId, variablesToRemove);
    await taskService.complete(task);
  });
}

export default {
  getDataPlagiarism,
  getEditorsDataPlagiarism,
  resetDataPlagiarism
};
