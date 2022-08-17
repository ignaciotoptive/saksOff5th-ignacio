const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const tableName = 'products';

const Product = sequelize.define(
  'Product',
  {
    SKU: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    inventory: {
      type: Sequelize.INTEGER,
    },
    shipmentDaysMin: {
      type: Sequelize.INTEGER,
    },
    shipmentDaysMax: {
      type: Sequelize.INTEGER,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
    category: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

Product.associate = function (db) {
  Product.hasMany(db.Image, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
  Product.hasMany(db.Order, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
};

module.exports = Product;
