import registerUserTasks from "./RegisterReader";
import registerWriterTasks from "./RegisterWriter";
export const init = () => {
  Object.values(registerUserTasks).forEach((s) => s());
  Object.values(registerWriterTasks).forEach((s) => s());
};
