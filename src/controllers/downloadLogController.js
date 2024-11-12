// src/controllers/downloadLogController.js
const DownloadLog = require('../models/downloadLog');

exports.createDownloadLog = async (req, res) => {
  try {
    const { format, timestamp, userId, letraId } = req.body;
    const newLog = await DownloadLog.create({ format, timestamp, userId, letraId });
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error al guardar el historial de descargas', error);
    res.status(500).json({ message: 'Error al guardar el historial de descargas', error });
  }
};

exports.getDownloadLogs = async (req, res) => {
  try {
    const logs = await DownloadLog.findAll();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error al obtener el historial de descargas', error);
    res.status(500).json({ message: 'Error al obtener el historial de descargas', error });
  }
};

exports.getDownloadLogsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await DownloadLog.findAll({ where: { userId } });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error al obtener el historial de descargas por usuario', error);
    res.status(500).json({ message: 'Error al obtener el historial de descargas por usuario', error });
  }
};