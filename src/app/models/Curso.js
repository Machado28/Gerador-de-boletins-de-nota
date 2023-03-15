import Sequelize, { Model } from 'sequelize';

class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }
}
export default Curso;
