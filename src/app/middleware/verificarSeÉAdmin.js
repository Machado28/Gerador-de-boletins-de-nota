/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import Usuario from '../models/Usuario';

export default async (req, res, next) => {
  const id_usuario_logado = req.usuario_id;

  const usuario_logado_é_adminiatrador = await Usuario.findOne({
    where: {
      id: id_usuario_logado,
      isAdmin: true,
    },
  });

  if (!usuario_logado_é_adminiatrador) return res.status(403).json({ error: 'Somente para Administradores' });

  next();
};
