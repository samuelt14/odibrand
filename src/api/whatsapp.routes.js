const express = require('express');
const router = express.Router();
const controller = require('../controllers/whatsapp.controller');

router.get('/webhook', controller.verificarToken);
router.post('/webhook', controller.webhook);

module.exports = router;
