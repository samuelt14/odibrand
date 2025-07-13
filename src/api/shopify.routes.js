const express = require('express');
const router = express.Router();
const shopifyController = require('../controllers/shopify.controller');
const verifyShopify = require('../middlewares/verifyShopify');

// POST /api/shopify/webhook
router.post('/webhook', verifyShopify, shopifyController.handleWebhook);

// GET /api/shopify/status
router.get('/status', (req, res) => {
  res.json({ status: '🛒 Shopify webhook activo', timestamp: new Date() });
});

module.exports = router;
