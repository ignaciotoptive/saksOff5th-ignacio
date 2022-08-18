const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const tableName = 'cards';

const Card = sequelize.define(
  'Card',
  {
    last4: {
      type: Sequelize.STRING,
    },
    expirationDate: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

Card.associate = function (db) {
  Card.belongsTo(db.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  Card.hasMany(db.Order, {
    foreignKey: 'paymentCardId',
    onDelete: 'CASCADE',
  });
};

module.exports = Card;
