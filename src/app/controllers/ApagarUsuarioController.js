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

class ApagarUsuarioController {
  async apagar(req, res) {
    const API_KEY = '60781f9e791759c4763cd9554cb0868c57b0ec8b33e65d09fc1704cb1262964e';

    const usuario = await Usuario.findOne({
      where: { id: req.params.id, isAdmin: false },
    });
    if (!usuario) {
      return res
        .status(403)
        .json({
          error: 'usuario não cadastrado ou convidado',
        });
    }

    await usuario.destroy({ where: { id: req.params.id } });

    return res.status(201).json({
      mensagem: 'parabêns! usuario eliminado com sucesso!',
    });
    /// //////////////////////////////////////////////////
  }
}
export default new ApagarUsuarioController();
