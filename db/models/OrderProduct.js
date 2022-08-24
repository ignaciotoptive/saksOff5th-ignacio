const Sequelize = require('sequelize');

const sequelize = require('../connection/database');

const tableName = 'order-product';

const OrderProduct = sequelize.define(
  'OrderProduct',
  {
    price: {
      type: Sequelize.FLOAT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
  },
  { tableName }
);

OrderProduct.associate = function (db) {
  OrderProduct.belongsTo(db.Order, {
    foreignKey: 'orderId',
    onDelete: 'CASCADE',
  });
  OrderProduct.belongsTo(db.Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
};

module.exports = OrderProduct;
