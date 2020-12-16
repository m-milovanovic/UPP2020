import registerUserTasks from './RegisterReader';

export const init = () => {
    registerUserTasks.createReader();
    registerUserTasks.activateReader();
    registerUserTasks.sendActivation();
}