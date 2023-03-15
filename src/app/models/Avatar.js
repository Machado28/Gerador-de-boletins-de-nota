/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:4444/avatar/${this.path}`;
          },
        },

      },
      { sequelize },

    );

    return this;
  }
}
export default Avatar;
