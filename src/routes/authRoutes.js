const express = require('express');
const { loginUser } = require('../controllers/userController'); // Asegúrate de que la ruta es correcta
const router = express.Router();

router.post('/login', loginUser);

module.exports = router;