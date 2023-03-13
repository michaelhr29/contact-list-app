const { DataTypes } = require('sequelize');
const db = require('../lib/db');
const Account = require('./Account');

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'name',
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'lastname',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
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
    phones: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      field: 'phones',
    },
    links: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'links',
    },
  },
  {
    tableName: 'user',
  }
);

User.hasOne(Account);
Account.belongsTo(User);

module.exports = User;
