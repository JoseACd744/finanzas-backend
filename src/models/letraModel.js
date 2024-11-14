// src/models/letraModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Letra = sequelize.define('Letra', {
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreEntidad: {
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
        allowNull: false
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Letra;