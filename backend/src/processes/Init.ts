import registerUserTasks from './RegisterReader';
import registerWriterTasks from './RegisterWriter';
export const init = () => {
  registerUserTasks.createReader();
  registerUserTasks.activateReader();
  registerUserTasks.sendActivation();
  registerWriterTasks.activateWriter();
  registerWriterTasks.createWriter();
};
