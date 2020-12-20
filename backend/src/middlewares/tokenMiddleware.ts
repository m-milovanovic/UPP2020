import { SECRET } from '../config/config';
import jwt from 'jsonwebtoken';

const tokenMiddleware = (request, _, next) => {
  const authorizationParam = request.get('Authorization');
  if (authorizationParam && authorizationParam.toLowerCase().startsWith('bearer ')) {
    const token = authorizationParam.substring(7);
    request.userInfo = jwt.verify(token, SECRET);
  }
  next();
};

export default tokenMiddleware;