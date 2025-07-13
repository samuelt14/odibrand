const mysql = require('mysql2/promise');
const config = require('../../config');

// Validación básica
if (!config.MYSQL_CONFIG) {
  throw new Error('❌ Configuración de MYSQL_CONFIG no encontrada en config.js');
}

const pool = mysql.createPool({
  host: config.MYSQL_CONFIG.host,
  user: config.MYSQL_CONFIG.user,
  password: config.MYSQL_CONFIG.password,
  database: config.MYSQL_CONFIG.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  /**
   * Ejecuta una consulta SQL genérica
   * @param {string} sql 
   * @param {array} params 
   * @returns {Promise<array>}
   */
  query: async (sql, params) => {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('❌ Error en query():', error);
      throw error;
    }
  },

  /**
   * Inserta el mensaje del usuario y la respuesta del bot
   * @param {string} mensaje 
   * @param {string} respuesta 
   */
  insertLog: async (mensaje, respuesta) => {
    try {
      const sql = 'INSERT INTO chatbot_logs (mensaje, respuesta, fecha) VALUES (?, ?, NOW())';
      await pool.execute(sql, [mensaje, respuesta]);
      console.log('✅ Mensaje guardado en la base de datos');
    } catch (error) {
      console.error('❌ Error al insertar en chatbot_logs:', error);
    }
  }
};
