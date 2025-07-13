const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbot.controller');

// POST /api/chatbot/responder
router.post('/responder', chatbotController.responder);

// GET /api/chatbot/status
router.get('/status', (req, res) => {
  res.json({ status: '🤖 Chatbot activo', timestamp: new Date() });
});

module.exports = router;
