/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import Usuario from '../models/Usuario';
import authConfig from '../../config/auth';
import Contacto from '../models/Contacto';
import Login from '../models/Login';

class SignoutController {
  async executar(req, res) {
    req.headers.authorization = null;
    return res.status(200).end();
  }
}

export default new SignoutController();
