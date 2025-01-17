require('dotenv').config();

const express = require('express'); 
const fileupload = require('express-fileupload');
const middlewares = require('./src/middlewares/middlewares');
const cors = require('cors');
const celularRoutes = require('./src/routes/celular.routes');
const db = require('./src/config/conexion');

const app = express();
const PORT = process.env.PORT || 3000;

db.connect();

middlewares(app);

const corsOptions = {
    origin: '*', // Permite todas las solicitudes, pero puedes restringir a un dominio específico si lo prefieres
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras permitidas
};
app.use(cors(corsOptions));

// Configurar express-fileupload
app.use(fileupload({
    useTempFiles: true, // Usar archivos temporales
    tempFileDir: '/tmp/', // Directorio temporal
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use('/api', celularRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
