// src/models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Letra = require('./letraModel');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Letra, { foreignKey: 'userId' });
Letra.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;