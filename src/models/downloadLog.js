// src/models/DownloadLog.js
const { DataTypes } = require('sequelize');
const User = require('./userModel');
const Letra = require('./letraModel');
const sequelize = require('../config/database');
const DownloadLog = sequelize.define('DownloadLog', {
  format: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  letraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Letra,
      key: 'id'
    }
  }
});

DownloadLog.belongsTo(User, { foreignKey: 'userId' });
DownloadLog.belongsTo(Letra, { foreignKey: 'letraId' });
module.exports = DownloadLog;