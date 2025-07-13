const express = require('express');
const router = express.Router();

// Importar rutas individuales
const chatbotRoutes = require('../routes/chatbot.routes');
const shopifyRoutes = require('../routes/shopify.routes');
const whatsappRoutes = require('../routes/whatsapp.routes'); 

// Prefijos de ruta para organización
router.use('/chatbot', chatbotRoutes);
router.use('/shopify', shopifyRoutes);
router.use('/whatsapp', whatsappRoutes); // agrega solo si existe

// Ruta de prueba
router.get('/status', (req, res) => {
  res.json({
    status: '✅ API funcionando correctamente desde index.js',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
