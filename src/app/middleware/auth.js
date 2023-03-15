/* eslint-disable no-unreachable */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not Provider!' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.usuario_id = decoded.id;
    req.usuario_email = decoded.email;
    req.usuario_nome = decoded.nome_completo;
    return next();
  } catch (error) {
    return res.status(401).json({ error, authHeader });
  }
  return next();
};
