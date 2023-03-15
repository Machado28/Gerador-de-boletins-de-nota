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
import Avatar from '../models/Avatar';
import Usuario from '../models/Usuario';

class ActualizarUsuarioController {
  async atualizar(req, res) {
    const schema = yup.object().shape({
      nome_completo: yup.string(),
      avatar_id: yup.string(),
    });

    const API_KEY = '60781f9e791759c4763cd9554cb0868c57b0ec8b33e65d09fc1704cb1262964e';
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'dados incorrectos' });
    }

    const usuarioLogado = await Usuario.findOne({
      where: { email: req.usuario_email },
    });
    if (!usuarioLogado) {
      return res
        .status(403)
        .json({
          error: 'você não tem permissão para usar esta aplicação! contacte o Administrador',
        });
    }

    const avatar = await Avatar.findOne({
      where: { id: req.body.avatar_id },
    });
    if (!avatar) {
      return res
        .status(403)
        .json({
          error: 'erro ao inserir o avatar! tente novamente!',
        });
    }

    const { id } = await usuarioLogado.update({
      nome_completo: req.body.nome_completo,
      avatar_id: res.body.avatar_id,
    });
    return res.status(201).json({
      mensagem: 'parabêns! dado actualizado com sucesso!',
    });
    /// //////////////////////////////////////////////////
  }
}
export default new ActualizarUsuarioController();
