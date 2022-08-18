const Sequelize = require('sequelize');

const sequelize = require('../connection/database');

const hooks = {
  beforeCreate(order) {
    order.createdAt = new Date();
  },
};

const tableName = 'orders';

const Order = sequelize.define(
  'Order',
  {
    price: {
      type: Sequelize.FLOAT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
  },
  { hooks, tableName }
);

Order.associate = function (db) {
  Order.belongsTo(db.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  Order.belongsTo(db.Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
  Order.belongsTo(db.Card, {
    foreignKey: 'paymentCardId',
    onDelete: 'CASCADE',
  });
  Order.belongsTo(db.Address, {
    foreignKey: 'shippingAddressId',
    onDelete: 'CASCADE',
  });
};

module.exports = Order;
