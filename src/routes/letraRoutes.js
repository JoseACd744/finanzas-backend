// src/routes/letraRoutes.js
const express = require('express');
const { createLetra, getLetras, getLetraById, updateLetra, deleteLetra, getLetraCount } = require('../controllers/letraController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * /api/letras/count:
 *   get:
 *     summary: Contar letras
 *     tags: [Letras]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: ID del usuario propietario de las letras
 *     responses:
 *       200:
 *         description: Cantidad de letras obtenida exitosamente
 *       400:
 *         description: Error al obtener la cantidad de letras
 */
router.get('/count', getLetraCount); // Define esta ruta antes de la ruta con parámetro :id
/**
 * @swagger
 * /api/letras:
 *   post:
 *     summary: Crear una nueva letra
 *     tags: [Letras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: string
 *               nombreCliente:
 *                 type: string
 *               monto:
 *                 type: number
 *               tasaInteresEfectiva:
 *                 type: number
 *                 description: "Tasa de interés efectiva (por ejemplo, 0.105 para 10.5%)"
 *               seguroDesgravame:
 *                 type: number
 *                 description: "Seguro desgravame (por ejemplo, 0.02 para 2%)"
 *               fechaDescuento:
 *                 type: string
 *                 format: date
 *               fechaVencimiento:
 *                 type: string
 *                 format: date
 *               comisionEstudio:
 *                 type: number
 *               comisionActivacion:
 *                 type: number
 *               comisionOtro:
 *                 type: number
 *               retencion:
 *                 type: number
 *                 description: "Retención (por ejemplo, 0.05 para 5%)"
 *               gastosAdministrativos:
 *                 type: number
 *               portes:
 *                 type: number
 *               userId:
 *                 type: number
 *                 description: "ID del usuario propietario de la letra"
 *     responses:
 *       201:
 *         description: Letra creada exitosamente
 *       400:
 *         description: Error al crear la letra
 */
router.post('/', verifyToken, createLetra);

/**
 * @swagger
 * /api/letras:
 *   get:
 *     summary: Obtener todas las letras
 *     tags: [Letras]
 *     responses:
 *       200:
 *         description: Letras obtenidas exitosamente
 *       400:
 *         description: Error al obtener las letras
 */
router.get('/', verifyToken, getLetras);

/**
 * @swagger
 * /api/letras/{id}:
 *   get:
 *     summary: Obtener una letra por ID
 *     tags: [Letras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la letra
 *     responses:
 *       200:
 *         description: Letra obtenida exitosamente
 *       404:
 *         description: Letra no encontrada
 */
router.get('/:id', verifyToken, getLetraById);

/**
 * @swagger
 * /api/letras/{id}:
 *   put:
 *     summary: Actualizar una letra por ID
 *     tags: [Letras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la letra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: string
 *               nombreCliente:
 *                 type: string
 *               monto:
 *                 type: number
 *               tasaInteresEfectiva:
 *                 type: number
 *                 description: "Tasa de interés efectiva (por ejemplo, 0.105 para 10.5%)"
 *               seguroDesgravame:
 *                 type: number
 *                 description: "Seguro desgravame (por ejemplo, 0.02 para 2%)"
 *               fechaDescuento:
 *                 type: string
 *                 format: date
 *               fechaVencimiento:
 *                 type: string
 *                 format: date
 *               comisionEstudio:
 *                 type: number
 *               comisionActivacion:
 *                 type: number
 *               comisionOtro:
 *                 type: number
 *               retencion:
 *                 type: number
 *                 description: "Retención (por ejemplo, 0.05 para 5%)"
 *               gastosAdministrativos:
 *                 type: number
 *               portes:
 *                 type: number
 *               userId:
 *                 type: number
 *                 description: "ID del usuario propietario de la letra"
 *     responses:
 *       200:
 *         description: Letra actualizada exitosamente
 *       404:
 *         description: Letra no encontrada
 */
router.put('/:id', verifyToken, updateLetra);

/**
 * @swagger
 * /api/letras/{id}:
 *   delete:
 *     summary: Eliminar una letra por ID
 *     tags: [Letras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la letra
 *     responses:
 *       204:
 *         description: Letra eliminada exitosamente
 *       404:
 *         description: Letra no encontrada
 */
router.delete('/:id', verifyToken, deleteLetra);



module.exports = router;