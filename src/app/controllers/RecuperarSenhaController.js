/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import * as yup from 'yup';
import Usuario from '../models/Usuario';

class RecuperarSenhaController {
  async recuperar(req, res) {
    const schema = yup.object().shape({
      novaSenha: yup.string().min(6).required(),
      confirmarNovaSenha: yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'porfavor! preencha correctamento os campos! ' });
    }

    const { novaSenha, confirmarNovaSenha } = req.body;
    const usuario = await Usuario.findOne({ where: { id: req.usuario_id } });

    const senhaNovaConfirmada = novaSenha === confirmarNovaSenha;

    if (!senhaNovaConfirmada) {
      return res.status(401).json({
        error: ' o campo nova senha e confirmar nova senha, devem ser iguais!',
      });
    }

    if (!usuario) return res.status(404).end('usuario não encontrado!');

    await usuario.update({ senha: novaSenha });

    return res.status(201).json({ mensagem: 'senha alterada com sucesso!' });
  }
}
export default new RecuperarSenhaController();
