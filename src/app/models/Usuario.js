/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_completo: Sequelize.STRING,
        isAdmin: Sequelize.BOOLEAN,
        activo: Sequelize.BOOLEAN,
        email: Sequelize.STRING,
        senha_hash: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
      },
      { sequelize },
    );
    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Curso, { foreignKey: 'curso_id', as: 'curso' });
    this.belongsTo(models.Avatar, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checksenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}
export default Usuario;
