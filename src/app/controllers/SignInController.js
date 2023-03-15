/* eslint-disable no-dupe-keys */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import Usuario from '../models/Usuario';
import Curso from '../models/Curso';
import authConfig from '../../config/auth';
import Avatar from '../models/Avatar';

class SignInController {
  async criar(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      senha: yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'dados incorrectos!' });
    }
    const { email, senha } = req.body;
    const usuario_email = await Usuario.findOne({
      where: { email },
    });

    if (!usuario_email) {
      return res.status(401).json({ error: 'você não possui uma conta!' });
    }

    const usuario_activo = await Usuario.findOne({
      where: { activo: true, email },
      attributes: ['nome_completo', 'id', 'isAdmin', 'email'],
      include: {
        model: Curso,
        attributes: ['id','designacao'],
        as: 'curso',
      },
      include: {
        model: Avatar,
        attributes: ['id','url','name','path'],
        as: 'avatar',
      },
    });

    if (!usuario_activo) {
      return res.status(401).json({ error: 'a tua conta está inativa! contacte o administrador' });
    }

    if (!(await usuario_email.checksenha(senha))) {
      return res.status(401).json({ error: 'senha ou login incorrecto!' });
    }

    const { id, nome_completo, isAdmin , avatar_id ,curso_id} = usuario_activo;

    return res.json({
      usuario_activo,
      token: jwt.sign(
        {
          id, email, nome_completo, isAdmin, avatar_id,curso_id
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        },
      ),
    });
  }
}

export default new SignInController();
