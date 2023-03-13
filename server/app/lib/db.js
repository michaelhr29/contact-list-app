const { Sequelize } = require('sequelize');

const { database, username, password, dialect, host } = process.env;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

module.exports = sequelize;
