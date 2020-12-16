import MailService from '../services/MailService'

const { Client, logger } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events

export const start = () => {
    const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

    // create a Client instance with custom configuration
    const client = new Client(config);

    client.subscribe("createReader", async function ({ task, taskService }: any) {
        await taskService.complete(task)
    })

    client.subscribe("activateReader", async function ({ task, taskService }: any) {
        await taskService.complete(task)
    })

    client.subscribe("proba", async function ({ task, taskService }: any) {
        const processID = task.variables.get("processID")
        const email = task.variables.get("email")
        console.log(email)
        console.log(processID)
        MailService.send(email, processID)
        await taskService.complete(task);
    });
}

