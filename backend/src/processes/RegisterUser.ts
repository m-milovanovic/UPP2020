import client from "../CamundaClient";

const createReader = () =>
  client.subscribe("createReader", async function ({ task, taskService }) {
    console.log("create reader");
    await taskService.complete(task);
  });

const sendActivation = () => {
  client.subscribe("sendActivation", async function ({ task, taskService }) {
    console.log("Send activation");
    await taskService.complete(task);
  });
};

const activateUser = () => {
  client.subscribe("activateUser", async function ({ task, taskService }) {
    console.log("Activate user");
    await taskService.complete(task);
  });
};

export default {
    createReader,
    sendActivation,
    activateUser
}
