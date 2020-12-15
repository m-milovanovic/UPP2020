const { Client, logger } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);




client.subscribe("createReader", async function ({ task, taskService }) {
    await taskService.complete(task)
})

client.subscribe("proba", async function ({ task, taskService }) {
    // Put your business logic
    // complete the task
    console.log(task.getProcessInstanceId())
    const email = "email@gmail.com"
    const processID = "processidrandom"
    console.log(email)
    //MailService.send(email, processID)
    await taskService.complete(task);
});

