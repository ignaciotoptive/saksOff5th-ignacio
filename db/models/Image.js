const Sequelize = require('sequelize');

const sequelize = require('../connection/database');

const tableName = 'images';

const Image = sequelize.define(
  'Image',
  {
    url: {
      type: Sequelize.STRING,
    },
    width: {
      type: Sequelize.INTEGER,
    },
    height: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Image.associate = function (db) {
  Image.belongsTo(db.Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
};

module.exports = Image;
