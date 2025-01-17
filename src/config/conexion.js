require ('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;