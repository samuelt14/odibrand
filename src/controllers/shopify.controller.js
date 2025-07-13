// src/controllers/shopify.controller.js

exports.handleOrder = async (req, res) => {
  try {
    const pedido = req.body;

    console.log('📦 Nuevo pedido recibido desde Shopify:');
    console.log(`- ID: ${pedido.id}`);
    console.log(`- Email cliente: ${pedido.email}`);
    console.log(`- Total: $${pedido.total_price}`);
    console.log(
      `- Productos: ${pedido.line_items
        .map((item) => `${item.title} (x${item.quantity})`)
        .join(', ')}`
    );

    // Aquí puedes:
    // - Guardar en base de datos
    // - Notificar a n8n
    // - Enviar por WhatsApp al cliente

    return res.status(200).send('Pedido procesado correctamente');
  } catch (error) {
    console.error('❌ Error al procesar pedido Shopify:', error);
    return res.status(500).send('Error interno del servidor');
  }
};

exports.handleProductUpdate = async (req, res) => {
  try {
    const producto = req.body;

    console.log('🛒 Producto actualizado:');
    console.log(`- ID: ${producto.id}`);
    console.log(`- Nombre: ${producto.title}`);
    console.log(`- Precio: ${producto.variants?.[0]?.price}`);

    // Aquí puedes actualizar la base de datos o informar a n8n

    return res.status(200).send('Producto actualizado');
  } catch (error) {
    console.error('❌ Error al procesar producto:', error);
    return res.status(500).send('Error interno del servidor');
  }
};

// Nuevo controlador general para manejar los webhooks de Shopify
exports.handleWebhook = async (req, res) => {
  const topic = req.get('X-Shopify-Topic');

  console.log(`📥 Webhook recibido con evento: ${topic}`);

  switch (topic) {
    case 'orders/create':
      return exports.handleOrder(req, res);
    case 'products/update':
      return exports.handleProductUpdate(req, res);
    default:
      console.warn(`⚠️ Webhook no manejado: ${topic}`);
      return res.status(200).send('Evento no manejado');
  }
};
