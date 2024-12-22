require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const letraRoutes = require('./routes/letraRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const { swaggerUi, specs } = require('./config/swagger');
const downloadLogRoutes = require('./routes/downloadLogRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de CORS para aceptar cualquier origen y localhost:4200
const corsOptions = {
    origin: ['*', 'http://localhost:4200', 'https://prod-fullstack-hfckgufbhdccgecd.eastus2-01.azurewebsites.net'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/letras', letraRoutes);
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación
app.use('/api/download-log', downloadLogRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Sirve los archivos estáticos de la aplicación Angular
app.use(express.static(path.join(__dirname, 'dist/finanzas-app/browser')));

// Redirige todas las rutas no encontradas a index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/finanzas-app/browser/index.html'));
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Connected to MySQL');
    });
}).catch(err => {
    console.error('Failed to connect to MySQL', err);
});