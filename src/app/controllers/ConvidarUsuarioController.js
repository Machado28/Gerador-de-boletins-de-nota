/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unreachable */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import * as yup from 'yup';
import Usuario from '../models/Usuario';
import Curso from '../models/Curso';

class CadastroUsuarioController {
  async criar(req, res) {
    const schema = yup.object().shape({
      curso: yup.string().required('preencha o campo  curso'),
      email: yup.string().email('preeencha o campo email').required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json();
    }

    const email_já_convidado = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (email_já_convidado) { return res.status(400).json({ error: 'usuário já convidado!' }); }

    let curso_ja_cadastrado = await Curso.findOne({ where: { designacao: req.body.curso } });

    // SE O CURSO NÃO ESTÁ CADASTRADO , CADASTRE AUTOMATICAMENTE e poe o id na variavel golbar curso_id
    if (!curso_ja_cadastrado) {
      curso_ja_cadastrado = await Curso.create({ designacao: req.body.curso });
    }
    const { id: curso_id } = curso_ja_cadastrado;

    const { email, isAdmin = false } = req.body;

    await Usuario.create({
      isAdmin,
      curso_id,
      activo: false,
      email,
    });

    // ENVIANDO MENSAGEM PAR O TELEFONE DO USUARIO
    return res.status(201).json({ message: 'usuario convidado com sucesso!' }); // Success message
    /// //////////////////////////////////////////////////
  }
}
export default new CadastroUsuarioController();
