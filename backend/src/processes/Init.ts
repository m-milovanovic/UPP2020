import registerUserTasks from './RegisterUser';

export const init = () => {
    registerUserTasks.createReader();
    registerUserTasks.activateUser();
    registerUserTasks.sendActivation();
}