const Sequelize = require('sequelize');

const config = require('../config/config');

let database;

switch (process.env.NODE_ENV) {
  default:
    database = new Sequelize(
      config.development.database,
      config.development.username,
      config.development.password,
      {
        host: config.development.host,
        dialect: config.development.dialect,
        port: config.development.port,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        define: {
          timestamps: false,
        },
        logging: config.development.logging,
      }
    );
}

module.exports = database;
