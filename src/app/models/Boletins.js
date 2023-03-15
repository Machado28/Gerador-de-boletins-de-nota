/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class Boletins extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:4444/boletins/${this.path}`;
          },
        },
        quantidade: Sequelize.INTEGER,

      },
      { sequelize },

    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}
export default Boletins;
