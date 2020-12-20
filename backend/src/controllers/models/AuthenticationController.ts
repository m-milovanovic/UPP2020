import express from 'express';
import AuthenticationService from '../../services/AuthenticationService';

const router = express.Router();

router.post('', async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  console.log(username, password)
  const retVal = await AuthenticationService.authenticate(username, password);
  if (!retVal.ind) {
    return response.status(401).end();
  }
  return response.status(200).json(retVal.token).end();
});

export default router;