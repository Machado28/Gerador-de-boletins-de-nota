/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import Boletins from '../models/Boletins';
import Curso from '../models/Curso';
import Usuario from '../models/Usuario';

class ListagemDeBoletinsBoletinsParaAdminController {
  async todos(req, res) {
    const { page = 1 } = req.query;

    const { curso = 'informatica' } = req.query;
    const boletins = await Boletins.findAll({
      order: ['createdAt'],
      limit: 5,
      desc: -1,
      offset: Math.abs((page - 2) * 5),
      attributes: ['id', 'name', 'path', 'quantidade', 'usuario_id'],
      include: [{
        model: Usuario, attributes: ['id', 'nome_completo', 'curso_id'], as: 'usuario', include: [{ model: Curso, attributes: ['id', 'designacao'], as: 'curso' }],
      }],
    });
    return res.status(200).json(boletins);
  }
}
export default new ListagemDeBoletinsBoletinsParaAdminController();
