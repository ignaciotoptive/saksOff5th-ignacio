'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email='user1@gmail.com';`
    );

    const user1 = users[0][0];
    await queryInterface.bulkInsert('cards', [
      {
        last4: '4242',
        expirationDate: '05/27',
        name: 'John Doe',
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
    await queryInterface.bulkDelete('cards', null, {});
  },
};
