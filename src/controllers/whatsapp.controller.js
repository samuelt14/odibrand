const whatsappService = require('../services/whatsapp.service');
const chatbotController = require('./chatbot.controller');

exports.webhook = async (req, res) => {
  const body = req.body;

  if (body.object) {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0]?.value;
    const mensajes = changes?.messages?.[0];

    if (mensajes) {
      const numero = mensajes.from;
      const texto = mensajes.text?.body;

      // Obtener respuesta desde el chatbot
      const reqFake = { body: { mensaje: texto } };
      const resFake = {
        status: () => ({ json: () => {} })
      };

      const respuesta = await chatbotController.responder(reqFake, resFake);

      // Enviar respuesta por WhatsApp
      await whatsappService.enviarMensajeTexto(numero, respuesta.respuesta);
    }

    return res.sendStatus(200);
  }

  res.sendStatus(404);
};

// Verificación inicial de webhook
exports.verificarToken = (req, res) => {
  const VERIFY_TOKEN = 'tu_token_verificacion';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('🟢 Webhook verificado');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};
