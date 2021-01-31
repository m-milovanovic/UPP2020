import client from '../CamundaClient';
import ProcessInstanceApi from '../camunda-engine/ProcessInstance';
import { Variables } from 'camunda-external-task-client-js';
import StaffService from '../services/StaffService';
import BookService from '../services/BookService';
const { File } = require('camunda-external-task-client-js');

const getDataPlagiarism = () => {
  client.subscribe('getDataPlagiarism', async function ({ task, taskService }) {
    const variables = new Variables();
    const mainEditor = await StaffService.findMainEditor();

    const originalBook = JSON.parse(task.variables.get('originalBook'));
    const plagiarismBook = JSON.parse(task.variables.get('plagiarismBook'));
    const originalBookInfo = await BookService.findById(+originalBook.id);
    const plagiarismBookInfo = await BookService.findById(+plagiarismBook.id);

    console.log(`../../resources/books/${originalBookInfo.id}.${originalBookInfo.extension}`);
    const originalBookFile = await new File({
      localPath: `./resources/books/${originalBookInfo.id}.${originalBookInfo.extension}`,
    }).load();
    const plagiarismBookFile = await new File({
      localPath: `./resources/books/${plagiarismBookInfo.id}.${plagiarismBookInfo.extension}`,
    }).load();

    variables.set('mainEditor', mainEditor.username);
    variables.set('mainEditorMail', mainEditor.email);
    variables.set(`(Original) ${originalBookInfo.getFullNameWithoutExt()}---`, originalBookFile);
    variables.set(`(Plagiarism) ${plagiarismBookInfo.getFullNameWithoutExt()}---`, plagiarismBookFile);
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
    let variablesToRemove = assignedEditors.map((editor) => editor + "'s notes---");
    variablesToRemove.push('assignedEditors');
    variablesToRemove.push('votes');
    variablesToRemove.push('paper');
    await ProcessInstanceApi.removeVariableList(instanceId, variablesToRemove);
    await taskService.complete(task);
  });
};

export default {
  getDataPlagiarism,
  getEditorsDataPlagiarism,
  resetDataPlagiarism,
};
