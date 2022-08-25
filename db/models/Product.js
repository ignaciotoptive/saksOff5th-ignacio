const Sequelize = require('sequelize');

const sequelize = require('../connection/database');

const tableName = 'products';

const Product = sequelize.define(
  'Product',
  {
    SKU: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      validate: {
        is: /^([0-9]*[.])?[0-9]+$/,
      },
    },
    inventory: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
      },
    },
    shipmentDaysMin: {
      type: Sequelize.INTEGER,
      validate: {
        isLessThanShipmentDaysMax(value) {
          if (parseInt(value) > parseInt(this.shipmentDaysMax)) {
            throw new Error(
              'shipmentDaysMin must be less or equal to shipmentDaysMax'
            );
          }
        },
      },
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
  Product.hasMany(db.OrderProduct, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
};

module.exports = Product;
