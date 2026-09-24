require('dotenv').config();
const mysql = require('mysql2/promise');

const variablesRequeridas = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];

for (const nombreVariable of variablesRequeridas) {
  if (!process.env[nombreVariable]) {
    throw new Error(`Falta la variable de entorno: ${nombreVariable}. Revisa tu archivo .env`);
  }
}

const conexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

module.exports = conexion;