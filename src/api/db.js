const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // o el nombre de tu usuario
  host: 'localhost',
  database: 'asistencia_db',
  password: 'admin',
  port: 5432,
});

module.exports = pool;
