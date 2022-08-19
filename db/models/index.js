'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const sequelize = require('../connection/database');

const db = {
  Address: require('./Address'),
  Card: require('./Card'),
  Image: require('./Image'),
  Order: require('./Order'),
  Product: require('./Product'),
  User: require('./User'),
};
/* Custom handler for reading current working directory */
const models = process.cwd() + '/db/models/' || __dirname;

/* fs.readdirSync(__dirname) */
fs.readdirSync(models)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    /* const model = sequelize["import"](path.join(__dirname, file)); */
    // FIXME: require cannot find module using absolute path
    // const model = require(path.join('.', file))(sequelize, Sequelize.DataTypes);
    // db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
