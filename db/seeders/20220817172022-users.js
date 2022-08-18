'use strict';
const { ROLE } = require('../../utils/types');

// "password" hash generated with https://bcrypt-generator.com/
const defaultPassword =
  '$2a$12$dEyfs/olzQTQdaR0XdaHuOQwxM.quwCM4aVksqKY5KOQjclNRBch.';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Initialize Users table
    return queryInterface.bulkInsert('users', [
      {
        email: 'user1@gmail.com',
        password: defaultPassword,
        role: ROLE.CUSTOMER,
      },
      {
        email: 'user2@gmail.com',
        password: defaultPassword,
        role: ROLE.CUSTOMER,
      },
      {
        email: 'merchandiser@webstore.com',
        password: defaultPassword,
        role: ROLE.MERCHANDISER,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
