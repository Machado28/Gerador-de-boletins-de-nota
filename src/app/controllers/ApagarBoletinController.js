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
import verificarSeÉAdmin from '../middleware/verificarSeÉAdmin';
import Boletin from '../models/Boletins';

class ApagarBoletinController {
  async apagar(req, res) {
    const API_KEY = '60781f9e791759c4763cd9554cb0868c57b0ec8b33e65d09fc1704cb1262964e';

    const boletin = await Boletin.findOne({
      where: { id: req.params.id, usuario_id: req.usuario_id },
    });

    if (!boletin) {
      return res
        .status(401)
        .json({
          error: 'Somente o prorpientário pode eleminar!',
        });
    }

    await boletin.destroy({ where: { id: req.params.id } });

    return res.status(201).json({
      mensagem: 'parabêns! boletin apagado com sucesso!',
    });
    /// //////////////////////////////////////////////////
  }
}
export default new ApagarBoletinController();
