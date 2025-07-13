const openaiService = require('../services/openai.service');
const db = require('../services/db.service');
const format = require('../utils/formatMessage');
const shopifyService = require('../services/shopify.service');

exports.responder = async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje || typeof mensaje !== 'string') {
      return res.status(400).json({ error: 'Mensaje inválido' });
    }

    const mensajeLimpio = format.limpiarMensaje(mensaje);
    const mensajeLower = mensajeLimpio.toLowerCase();

    let respuesta;

    // 🔍 Consultar productos si el mensaje tiene ciertas palabras clave
    if (
      mensajeLower.includes('producto') ||
      mensajeLower.includes('disponible') ||
      mensajeLower.includes('venden') ||
      mensajeLower.includes('catálogo') ||
      mensajeLower.includes('tienen')
    ) {
      const productos = await shopifyService.obtenerProductos();

      if (productos.length === 0) {
        respuesta = 'Lo siento, actualmente no tenemos productos disponibles.';
      } else {
        const listado = productos
          .map(p => `🛍️ ${p.title} - $${p.price} (Stock: ${p.inventory ?? 'N/A'})`)
          .join('\n');
        respuesta = `¡Claro! Estos son algunos de nuestros productos disponibles:\n\n${listado}`;
      }
    } else {
      const prompt = format.crearPromptConContexto(mensajeLimpio);
      respuesta = await openaiService.getRespuestaIA(prompt);
    }

    await db.insertLog(mensajeLimpio, respuesta);

    return res.status(200).json({
      mensaje: mensajeLimpio,
      respuesta
    });

  } catch (error) {
    console.error('❌ Error en chatbot.controller:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
