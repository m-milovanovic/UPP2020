import express from 'express';
import ProcessInstance from '../camunda-engine/ProcessInstance';

const router = express.Router();

router.get('', async (request, response) => {
  const username = request['userInfo'].username;
  const processInstance = await ProcessInstance.getByUsername(username, 'registerWriter');
  if (!processInstance) {
    response.status(404).end();
  }
  try {
    ProcessInstance.sendMessage(processInstance.id, 'subscriptionPaid');
    response.status(204).end();
  } catch (error) {
    response.status(400).json(error);
  }
});

export default router;
