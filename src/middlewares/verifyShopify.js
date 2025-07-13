// src/middlewares/verifyShopify.js

const crypto = require('crypto');
const config = require('../../config'); // corregida la ruta relativa

/**
 * Middleware para verificar la autenticidad del webhook de Shopify
 */
function verifyShopify(req, res, next) {
  const SHOPIFY_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || config.SHOPIFY_SECRET;

  const hmacHeader = req.get('X-Shopify-Hmac-Sha256');

  if (!hmacHeader) {
    return res.status(401).send('Falta firma HMAC');
  }

  // Verificamos usando el cuerpo en bruto (rawBody), NO el JSON parseado
  const rawBody = req.rawBody;

  if (!rawBody) {
    return res.status(400).send('No se recibió cuerpo RAW');
  }

  const generatedHmac = crypto
    .createHmac('sha256', SHOPIFY_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64');

  if (generatedHmac !== hmacHeader) {
    console.warn('⚠️ Firma HMAC inválida');
    return res.status(403).send('Firma HMAC no válida');
  }

  // Firma válida
  next();
}

module.exports = verifyShopify;
