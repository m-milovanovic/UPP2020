import registerUserTasks from './RegisterReader';
import registerWriterTasks from './RegisterWriter';
import publishBookTasks from './PublishBook';
import reportPlagiarismTasks from './ReportPlagiarism';

export const init = () => {
  Object.values(registerUserTasks).forEach((s) => s());
  Object.values(registerWriterTasks).forEach((s) => s());
  Object.values(publishBookTasks).forEach((s) => s());
  Object.values(reportPlagiarismTasks).forEach((s) => s());
};
