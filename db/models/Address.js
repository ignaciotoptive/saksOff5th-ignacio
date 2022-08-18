const Sequelize = require('sequelize');

const sequelize = require('../connection/database');

const tableName = 'addresses';

const Address = sequelize.define(
  'Address',
  {
    type: {
      type: Sequelize.STRING,
    },
    line1: {
      type: Sequelize.STRING,
    },
    line2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

Address.associate = function (db) {
  Address.belongsTo(db.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  Address.hasMany(db.Order, {
    foreignKey: 'shippingAddressId',
    onDelete: 'CASCADE',
  });
};

module.exports = Address;
