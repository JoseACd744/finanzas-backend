// src/routes/downloadLogRoutes.js
const express = require('express');
const router = express.Router();
const downloadLogController = require('../controllers/downloadLogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     DownloadLog:
 *       type: object
 *       required:
 *         - format
 *         - timestamp
 *         - userId
 *         - letraId
 *       properties:
 *         format:
 *           type: string
 *           description: El formato del archivo descargado (e.g., PDF, CSV)
 *         timestamp:
 *           type: string
 *           description: La fecha y hora de la descarga
 *         userId:
 *           type: integer
 *           description: El ID del usuario que realizó la descarga
 *         letraId:
 *           type: integer
 *           description: El ID de la letra descargada
 *       example:
 *         format: PDF
 *         timestamp: 2023-10-01 12:00:00
 *         userId: 1
 *         letraId: 1
 */

/**
 * @swagger
 * /api/download-log:
 *   post:
 *     summary: Crea un nuevo registro de historial de descargas
 *     tags: [DownloadLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DownloadLog'
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DownloadLog'
 *       500:
 *         description: Error al guardar el historial de descargas
 */
router.post('/', downloadLogController.createDownloadLog);

/**
 * @swagger
 * /api/download-log:
 *   get:
 *     summary: Obtiene todos los registros del historial de descargas
 *     tags: [DownloadLog]
 *     responses:
 *       200:
 *         description: Lista de registros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DownloadLog'
 *       500:
 *         description: Error al obtener el historial de descargas
 */
router.get('/', downloadLogController.getDownloadLogs);

/**
 * @swagger
 * /api/download-log/user/{userId}:
 *   get:
 *     summary: Obtiene todos los registros del historial de descargas por usuario
 *     tags: [DownloadLog]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Lista de registros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DownloadLog'
 *       500:
 *         description: Error al obtener el historial de descargas por usuario
 */
router.get('/user/:userId', downloadLogController.getDownloadLogsByUserId);

module.exports = router;