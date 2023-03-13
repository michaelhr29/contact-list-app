const { DataTypes } = require('sequelize');
const db = require('../lib/db');

const Account = db.define(
  'Account',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
      field: 'user_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'name',
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'updated_at',
    },
    lang: {
      type: DataTypes.ENUM('es', 'en'),
      allowNull: false,
      field: 'lang',
    },
  },
  {
    tableName: 'account',
  }
);

module.exports = Account;
