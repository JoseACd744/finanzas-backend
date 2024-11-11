// src/models/letraModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Letra = sequelize.define('Letra', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tasaInteresEfectiva: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    seguroDesgravame: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fechaDescuento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    valorNominal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    diasDescontados: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TEA: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    TEP: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tasaDescontada: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descuento: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valorNeto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valorRecibido: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valorEntregado: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    TCEA: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    interesCompensatorio: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    interesMoratorio: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    TCEAm: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

module.exports = Letra;