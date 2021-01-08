import { Variables } from "camunda-external-task-client-js";
import client from "../CamundaClient";

const getPeople = () => {
  client.subscribe("getPeople", async function ({ task, taskService }) {
    console.log("Get editor");
    const variables = new Variables();
    variables.set("editor", "board3");
    variables.set("mainEditor", "board3");
    variables.set("lecturer", "board3");
    variables.set("email", "ftn.milan@gmail.com")
    await taskService.complete(task, variables);
  });
};

const notifyMainEditor = () => {
  client.subscribe("notifyMainEditor", async function ({ task, taskService }) {
    console.log("Notify main editor");
    await taskService.complete(task);
  });
};

const checkForPlagiarism = () => {
  client.subscribe(
    "checkForPlagiarism",
    async function ({ task, taskService }) {
      console.log("Check for plagiarsim");
      const variables = new Variables();
      variables.set("plagiarisedSources", "source1\nsource2\nsource3");
      await taskService.complete(task, variables);
    }
  );
};

const getBetaReaders = () => {
  client.subscribe("getBetaReaders", async function ({ task, taskService }) {
    console.log("Get beta readers");
    const variables = new Variables();
    //TODO: pronaci beta readere po zanru
    variables.set(
      "betaReaderOptions",
      '["milanReader","milanReader2","milanReader3"]'
    );
    await taskService.complete(task, variables);
  });
};

const sendComments = () => {
  client.subscribe("sendComments", async function ({ task, taskService }) {
    console.log("Send comments");
    //TODO: poslati mail
    await taskService.complete(task);
  });
};

const revokeStatus = () => {
  client.subscribe("revokeStatus", async function ({ task, taskService }) {
    console.log("Revoke status");
    //TODO: revoke status of beta reader
    await taskService.complete(task);
  });
};

const addPenaltyPoint = () => {
  client.subscribe("addPenaltyPoint", async function ({ task, taskService }) {
    console.log("Add penalty point");
    //TODO: add penalty point to beta reader
    await taskService.complete(task);
  });
};

const addToRepository = () => {
  client.subscribe("addToRepository", async function ({ task, taskService }) {
    console.log("Add book to repository");
    //TODO: Add book to repository
    await taskService.complete(task);
  });
};

export default {
  notifyMainEditor,
  getPeople,
  checkForPlagiarism,
  getBetaReaders,
  sendComments,
  revokeStatus,
  addPenaltyPoint,
  addToRepository
};
