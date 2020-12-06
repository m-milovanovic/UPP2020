import {Client} from 'camunda-external-task-client-js';

const config = { baseUrl: "http://localhost:8080/engine-rest" }
const client = new Client(config);

export default client;