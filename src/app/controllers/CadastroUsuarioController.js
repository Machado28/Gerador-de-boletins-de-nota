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

class CadastroUsuarioController {
  async criar(req, res) {
    const schema = yup.object().shape({
      nome_completo: yup.string().required(),
      email: yup.string().email().required(),
      avatar_id: yup.string(),
      senha: yup.string().min(6).required('a senha deve conter mais de 6 caracteres'),
      confirmarSenha: yup.string().required(),
    });

    const API_KEY = '60781f9e791759c4763cd9554cb0868c57b0ec8b33e65d09fc1704cb1262964e';
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'dados incorrectos' });
    }

    const email_já_convidado = await Usuario.findOne({
      where: { email: req.body.email },
    });
    if (!email_já_convidado) {
      return res
        .status(403)
        .json({
          error: 'você não tem permissão para usar esta aplicação! contacte o Administrador',
        });
    }

    const usuario_já_activo = await Usuario.findOne({
      where: { activo: true, email: req.body.email },
    });
    if (usuario_já_activo) {
      return res.status(400).json({ error: 'você já possui uma conta activa! faça login!' });
    }

    if (!req.body.avatar_id) {
      req.body.avatar_id = 1;
    }

    const avatarExiste = await Avatar.findOne({
      where: { id: req.body.avatar_id },
    });
    if (!avatarExiste) {
      return res.status(404).json({ error: 'Avatar não encontrado' });
    }

    const {
      nome_completo, email, senha, confirmarSenha, avatar_id,
    } = req.body;

    const senhaConfirmada = senha === confirmarSenha;

    if (!senhaConfirmada) {
      return res.status(401).json({
        error: ' o campo  senha e confirmar senha, devem ser iguais!',
      });
    }

    const usuarioConvidado = usuario_já_activo;

    const { id } = await email_já_convidado.update({
      nome_completo,
      email,
      activo: true,
      senha,
      avatar_id,
    });

    return res.status(201).json({
      mensagem: 'parabêns! você foi cadastrado com sucesso!',
    });
    /// //////////////////////////////////////////////////
  }
}
export default new CadastroUsuarioController();
