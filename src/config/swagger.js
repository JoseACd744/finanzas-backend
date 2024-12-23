const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Finanzas',
            version: '1.0.0',
            description: 'Documentación de la API de Finanzas'
        },
        servers: [
            {
                url: 'https://prod-fullstack-hfckgufbhdccgecd.eastus2-01.azurewebsites.net',
                description: 'Servidor de producción'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/models/*.js'] // Rutas a los archivos donde se documentarán las rutas y modelos
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };