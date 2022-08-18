'use strict';
const { ADDRESS_TYPE } = require('../../utils/types');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email='user1@gmail.com';`
    );

    const user1 = users[0][0];

    await queryInterface.bulkInsert('addresses', [
      {
        line1: '123 ABC Street',
        line2: '',
        city: 'Wichita',
        state: 'KS',
        zipCode: '67211',
        country: 'USA',
        type: ADDRESS_TYPE.BILLING,
        userId: user1.id,
      },
      {
        line1: '123 ABC Street',
        line2: '',
        city: 'Wichita',
        state: 'KS',
        zipCode: '67211',
        country: 'USA',
        type: ADDRESS_TYPE.SHIPPING,
        userId: user1.id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('addresses', null, {});
  },
};
