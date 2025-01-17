const bodyParser = require('body-parser');

// Función para configurar middlewares globales
const configureGlobalMiddleware = (app) => {
    app.use(bodyParser.json()); // Parsear JSON en las solicitudes
    app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios
};

module.exports = configureGlobalMiddleware;