/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */

import Boletins from '../models/Boletins';
import Curso from '../models/Curso';
import Usuario from '../models/Usuario';

class ListagemDeCursoComBoletinsController {
  async maisBoletin(req, res) {
    const page = 1;
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

  async menorBoletin(req, res) {
    const page = 1;
    const BoletinsMenos = await Boletins.findAll({
      order: ['quantidade'],
      limit: 5,
      desc: -1,
      offset: (page - 1) * 5,
      attributes: ['id', 'path', 'name', 'url'],
      include: {
        model: Usuario,
        attributes: ['nome_completo'],
        as: 'usuario',

        include: { model: Curso, attributes: ['designacao'], as: 'curso' },
      },
    });

    BoletinsMenos.map((item) => ({
      ...item, curso: item.usuario.curso,
    }));

    return res.status(200).json(BoletinsMenos);
  }
}
export default new ListagemDeCursoComBoletinsController();
