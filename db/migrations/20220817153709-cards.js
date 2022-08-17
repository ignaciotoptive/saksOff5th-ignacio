'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      last4: {
        type: Sequelize.STRING,
      },
      expirationDate: {
        type: Sequelize.DATE,
      },
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  },
};
