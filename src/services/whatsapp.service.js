const axios = require('axios');
const config = require('../../config');

const token = config.WHATSAPP.TOKEN;
const phoneId = config.WHATSAPP.PHONE_ID;

exports.enviarMensajeTexto = async (numeroDestino, mensaje) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: numeroDestino,
        type: 'text',
        text: { body: mensaje }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Error al enviar mensaje a WhatsApp:', error.response?.data || error.message);
    throw error;
  }
};
