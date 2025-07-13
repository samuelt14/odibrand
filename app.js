const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./src/api'); // todas las rutas agrupadas

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para leer rawBody (necesario para verificar firmas HMAC de Shopify)
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Middlewares generales
app.use(cors());
app.use(morgan('dev')); // log de peticiones en desarrollo

// Rutas principales
app.use('/api', routes);

// Ruta raíz para comprobar el estado del servidor
app.get('/', (req, res) => {
  res.send('✅ API del chatbot con Shopify, WhatsApp y n8n está funcionando.');
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error('❌ Error general:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
