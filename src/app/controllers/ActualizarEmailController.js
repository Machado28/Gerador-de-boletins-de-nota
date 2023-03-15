/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unreachable */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import * as yup from 'yup';
import Usuario from '../models/Usuario';

class ActualizarEmailUsuarioController {
  async atualizar(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });

    const API_KEY = '60781f9e791759c4763cd9554cb0868c57b0ec8b33e65d09fc1704cb1262964e';
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'dados incorrectos' });
    }

    const usuario = await Usuario.findOne({
      where: { email: req.params.email },
    });
    if (!usuario) {
      return res
        .status(403)
        .json({
          error: 'você não tem permissão para usar esta aplicação! contacte o Administrador',
        });
    }

    await usuario.update({
      email: req.params.email,
    });

    return res.status(201).json({
      mensagem: 'parabêns! dado actualizado com sucesso!',
    });
    /// //////////////////////////////////////////////////
  }
}
export default new ActualizarEmailUsuarioController();
