require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            require: process.env.DB_SSL_REQUIRE === 'true',
            rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
        }
    }
});

// Sincronizar la base de datos
// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Base de datos eliminada y recreada con éxito.');
//     })
//     .catch(error => {
//         console.error('Error al sincronizar la base de datos:', error);
//     });

module.exports = sequelize;