import client from "../CamundaClient";
import MailService from '../services/MailService'

const createReader = () =>
  client.subscribe("createReader", async function ({ task, taskService }) {
    console.log("create reader");
    await taskService.complete(task);
  });

const sendActivation = () => {
  client.subscribe("sendActivation", async function ({ task, taskService }) {
    console.log("Send activation");
    const processID = task.variables.get("processID")
    const email = task.variables.get("email")
    MailService.send(email, processID)
    await taskService.complete(task);
  });
};

const activateReader = () => {
  client.subscribe("activateReader", async function ({ task, taskService }) {
    console.log("Activate reader");
    await taskService.complete(task);
  });
};

export default {
  createReader,
  sendActivation,
  activateReader
}
