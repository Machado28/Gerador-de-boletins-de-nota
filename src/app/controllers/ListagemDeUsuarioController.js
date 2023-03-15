/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import Avatar from '../models/Avatar';
import Curso from '../models/Curso';
import Usuario from '../models/Usuario';

class ListagemDeUsuarioController {
  async listarActivo(req, res) {
    const { page = 1 } = req.query;
    const usuariosActivos = await Usuario.findAll({
      where: { activo: true }, order: ['nome_completo'], limit: 5, offset: Math.abs((page - 2) * 5), attributes: ['id', 'activo', 'nome_completo', 'isAdmin', 'email', 'senha_hash'], include: { model: Curso, attributes: ['designacao'], as: 'curso' },
    });

    return res.status(200).json(usuariosActivos);
  }

  async listarTodos(req, res) {
    const { page = 1 } = req.query;
    const usuarios = await Usuario.findAll({
      order: ['nome_completo'],
      limit: 5,
      offset: Math.abs((page - 2) * 5),
      attributes: ['id', 'activo', 'nome_completo', 'isAdmin', 'email', 'senha_hash'],
      include: [
        { model: Curso, attributes: ['designacao'], as: 'curso' },
        { model: Avatar, attributes: ['id', 'url', 'path'], as: 'avatar' },
      ],
    });

    return res.status(200).json(usuarios);
  }

  async listarUm(req, res) {
    const { page = 1 } = req.query;
    const usuarios = await Usuario.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'activo', 'nome_completo', 'isAdmin', 'email', 'senha_hash'],
      include: { model: Curso, attributes: ['designacao'], as: 'curso' },
    });

    return res.status(200).json(usuarios);
  }

  async listarInactivo(req, res) {
    const { page = 1 } = req.query;
    const usuariosInativos = await Usuario.findAll({
      where: { activo: false }, order: ['nome_completo'], limit: 5, offset: Math.abs((page - 2) * 5), attributes: ['id', 'activo', 'nome_completo', 'isAdmin', 'email', 'senha_hash'], include: { model: Curso, attributes: ['designacao'], as: 'curso' },
    });

    return res.status(200).json(usuariosInativos);
  }
}
export default new ListagemDeUsuarioController();
