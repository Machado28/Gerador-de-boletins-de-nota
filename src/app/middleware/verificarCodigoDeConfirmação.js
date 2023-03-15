import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfirmCodigo';

export default async (req, res, next) => {
  const { token:tokenRecebido } = req.params;
 console.log(tokenRecebido)
  
  try {
    const decoded = await promisify(jwt.verify)(tokenRecebido, authConfig.secret);
    req.usuario_id = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
  return next();
};
