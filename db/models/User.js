const Sequelize = require('sequelize');
//const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../connection/database');

const hooks = {
  beforeCreate(user) {
    // const pass = bcryptService().password(user);
    // user.password = pass;
  },
};

const tableName = 'users';

const User = sequelize.define(
  'User',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  },
  { hooks, tableName }
);

User.associate = function (db) {
  User.hasMany(db.Address, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  User.hasMany(db.Card, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  User.hasMany(db.Order, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};

module.exports = User;
