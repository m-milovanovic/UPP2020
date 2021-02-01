import { Variables } from "camunda-external-task-client-js";
import client from "../CamundaClient";
import PlagiarismService from "../services/PlagiarismService";
import ReaderService from "../services/ReaderService";
import StaffService from "../services/StaffService";
import WriterService from "../services/WriterService";
import mime from 'mime-types'
import { Book } from '../entities/Book'
import BookService from "../services/BookService";

const getPeople = () => {
  client.subscribe("getPeople", async function ({ task, taskService }) {
    console.log("Get editor");
    const variables = new Variables();
    const writer = await WriterService.findByUsername(task.variables.get("username"))
    const editors = await StaffService.findEditors();
    const mainEditor = await StaffService.findMainEditor()
    const lecturer = await StaffService.findLecturer()
    variables.set("editor", editors[Math.floor(Math.random() * editors.length)].username);
    variables.set("mainEditor", mainEditor.username);
    variables.set("lecturer", lecturer.username);
    variables.set("writerEmail", writer.email)
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
    const bookFile = task.variables.getTyped(task.variables.get("title") + "---")
    const url = bookFile.value.engineService.baseUrl + bookFile.value.remotePath
    const extension = mime.extension(bookFile.value.mimeType)
    const bookname = bookFile.value.filename.split(`.${extension}`)[0]
    const writer = await WriterService.findByUsername(task.variables.get("username"))
    const book = new Book({ name: bookname, extension: extension as string, writer: writer });
    const savedBook = await BookService.save(book)
    download(url, `resources\\books\\${savedBook.id}.${extension}`, async () => { await taskService.complete(task) })
  });
};

var http = require('http');
var fs = require('fs');

const download = (url, dest, cb) => {
  var file = fs.createWriteStream(dest);
  http.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);
    });

  })
}


export default {
  notifyMainEditor,
  getPeople,
  checkForPlagiarism,
  getBetaReaders,
  revokeStatus,
  addPenaltyPoint,
  addToRepository
};
