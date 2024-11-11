// src/controllers/letraController.js
const Letra = require('../models/letraModel');
const moment = require('moment');

const createLetra = async (req, res) => {
    const { numero, nombreCliente, monto, tasaInteresEfectiva, seguroDesgravame, fechaDescuento, fechaVencimiento, comisionEstudio = 0, comisionActivacion = 0, comisionOtro = 0, retencion = 0, gastosAdministrativos = 0, portes = 0 } = req.body;

    try {
        const fechaInicio = new Date();
        let diasDescontados = moment(fechaDescuento).diff(moment(fechaInicio), 'days');
        if (diasDescontados === 0) {
            diasDescontados = moment(fechaVencimiento).diff(moment(fechaInicio), 'days');
        }
        const TEA = tasaInteresEfectiva;
        const TEP = (Math.pow(1 + TEA, diasDescontados / 360) - 1);
        const valorNominal = monto;
        const tasaDescontada = TEP / (1 + TEP / 100);
        const descuento = valorNominal * tasaDescontada / 100;
        const valorNeto = valorNominal - descuento;

        const seguroDesgravameMonto = seguroDesgravame * valorNominal;
        const costosIniciales = comisionEstudio + comisionActivacion + comisionOtro + seguroDesgravameMonto;
        const valorRecibido = valorNeto - costosIniciales - (retencion * valorNominal);
        const costosFinales = gastosAdministrativos + portes;
        const valorEntregado = valorNominal + costosFinales - (retencion * valorNominal);
        const diasTotales = moment(fechaVencimiento).diff(moment(fechaInicio), 'days');
        const TCEA = (Math.pow(valorEntregado / valorRecibido, 360 / diasTotales) - 1);

        const newLetra = await Letra.create({
            numero,
            nombreCliente,
            monto,
            tasaInteresEfectiva,
            seguroDesgravame,
            fechaDescuento,
            fechaVencimiento,
            fechaInicio,
            valorNominal,
            diasDescontados,
            TEA,
            TEP,
            tasaDescontada,
            descuento,
            valorNeto,
            valorRecibido,
            valorEntregado,
            TCEA
        });

        res.status(201).json(newLetra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLetras = async (req, res) => {
    try {
        const letras = await Letra.findAll();
        res.json(letras);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLetraById = async (req, res) => {
    try {
        const letra = await Letra.findByPk(req.params.id);
        if (!letra) {
            return res.status(404).json({ message: 'Letra no encontrada' });
        }
        res.json(letra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateLetra = async (req, res) => {
    try {
        const letra = await Letra.findByPk(req.params.id);
        if (!letra) {
            return res.status(404).json({ message: 'Letra no encontrada' });
        }

        const { numero, nombreCliente, monto, tasaInteresEfectiva, seguroDesgravame, fechaDescuento, fechaVencimiento, comisionEstudio = 0, comisionActivacion = 0, comisionOtro = 0, retencion = 0, gastosAdministrativos = 0, portes = 0 } = req.body;
        const fechaInicio = letra.fechaInicio;
        let diasDescontados = moment(fechaDescuento).diff(moment(fechaInicio), 'days');
        if (diasDescontados === 0) {
            diasDescontados = moment(fechaVencimiento).diff(moment(fechaInicio), 'days');
        }
        const TEA = tasaInteresEfectiva;
        const TEP = (Math.pow(1 + TEA, diasDescontados / 360) - 1) * 100;
        const valorNominal = monto;
        const tasaDescontada = TEP / (1 + TEP / 100);
        const descuento = valorNominal * tasaDescontada / 100;
        const valorNeto = valorNominal - descuento;

        const seguroDesgravameMonto = seguroDesgravame * valorNominal;
        const costosIniciales = comisionEstudio + comisionActivacion + comisionOtro + seguroDesgravameMonto;
        const valorRecibido = valorNeto - costosIniciales - (retencion * valorNominal);
        const costosFinales = gastosAdministrativos + portes;
        const valorEntregado = valorNominal + costosFinales - (retencion * valorNominal);
        const diasTotales = moment(fechaVencimiento).diff(moment(fechaInicio), 'days');
        const TCEA = (Math.pow(valorEntregado / valorRecibido, 360 / diasTotales) - 1) * 100;

        letra.numero = numero;
        letra.nombreCliente = nombreCliente;
        letra.monto = monto;
        letra.tasaInteresEfectiva = tasaInteresEfectiva;
        letra.seguroDesgravame = seguroDesgravame;
        letra.fechaDescuento = fechaDescuento;
        letra.fechaVencimiento = fechaVencimiento;
        letra.valorNominal = valorNominal;
        letra.diasDescontados = diasDescontados;
        letra.TEA = TEA;
        letra.TEP = TEP;
        letra.tasaDescontada = tasaDescontada;
        letra.descuento = descuento;
        letra.valorNeto = valorNeto;
        letra.valorRecibido = valorRecibido;
        letra.valorEntregado = valorEntregado;
        letra.TCEA = TCEA;

        await letra.save();
        res.json(letra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLetra = async (req, res) => {
    try {
        const letra = await Letra.findByPk(req.params.id);
        if (!letra) {
            return res.status(404).json({ message: 'Letra no encontrada' });
        }

        await letra.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createLetra, getLetras, getLetraById, updateLetra, deleteLetra };