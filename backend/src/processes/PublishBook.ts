import { Variables } from "camunda-external-task-client-js";
import client from "../CamundaClient";
import PlagiarismService from "../services/PlagiarismService";
import ReaderService from "../services/ReaderService";

const getPeople = () => {
  client.subscribe("getPeople", async function ({ task, taskService }) {
    console.log("Get editor");
    const variables = new Variables();
    variables.set("editor", "board3");
    variables.set("mainEditor", "board3");
    variables.set("lecturer", "board3");
    variables.set("writerEmail", "ftn.milan@gmail.com")
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
      variables.set("plagiarisedSources", PlagiarismService.getRandomSouces().join('\n'));
      await taskService.complete(task, variables);
    }
  );
};

const getBetaReaders = () => {
  client.subscribe("getBetaReaders", async function ({ task, taskService }) {
    console.log("Get beta readers");
    const variables = new Variables();
    const genre = task.variables.get('genre')
    const betaReaders = await ReaderService.getBetaReadersByGenre(genre)
    variables.set(
      "betaReaderOptions",
      JSON.stringify(betaReaders.map(reader => reader.username))
    );
    await taskService.complete(task, variables);
  });
};

const revokeStatus = () => {
  client.subscribe("revokeStatus", async function ({ task, taskService }) {
    console.log("Revoke status")
    const betaReaderUsername = task.variables.get("betaReader")
    await ReaderService.revokeBetaStatus(betaReaderUsername)
    await taskService.complete(task);
  });
};

const addPenaltyPoint = () => {
  client.subscribe("addPenaltyPoint", async function ({ task, taskService }) {
    console.log("Add penalty point");
    //TODO: set local variable?
    const betaReaderUsername = task.variables.get("betaReader")
    const betaReader = await ReaderService.addPenaltyPoint(betaReaderUsername)
    const variables = new Variables();
    if (betaReader.penaltyPoints === 5) {
      variables.set("revokeStatus", true);
      variables.set("notificationEmail", betaReader.email);
      variables.set("notificationTitle", "Beta reader status revoked")
      variables.set("notificationText", "Your beta reader status has been revoked")
    }
    await taskService.complete(task, variables);
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
  revokeStatus,
  addPenaltyPoint,
  addToRepository
};
