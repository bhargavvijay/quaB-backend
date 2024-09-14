const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cryptocurrency = sequelize.define('Cryptocurrency', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
  },
  buy: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
  },
  sell: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
  },
  volume: {
    type: DataTypes.DECIMAL(30, 8),
    allowNull: false,
  },
  base_unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Cryptocurrency;
