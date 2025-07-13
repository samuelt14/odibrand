const axios = require('axios');

// Cambia la URL si usas ngrok, render o producción
const BASE_URL = 'http://localhost:3000'; // o https://tu-api.ngrok.io

async function testChatbot() {
  try {
    const response = await axios.post(`${BASE_URL}/api/chatbot/responder`, {
      mensaje: "¿Cuál es el estado de mi pedido?"
    });

    console.log('Respuesta del chatbot:\n', response.data);
  } catch (error) {
    console.error('Error al probar chatbot:', error.response?.data || error.message);
  }
}

async function testShopifyOrder() {
  try {
    const mockPayload = {
      id: 123456789,
      email: 'cliente@correo.com',
      line_items: [
        { title: 'Producto A', quantity: 2 },
        { title: 'Producto B', quantity: 1 }
      ],
      total_price: '49.99',
      created_at: new Date().toISOString()
    };

    const response = await axios.post(`${BASE_URL}/api/shopify/order`, mockPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Hmac-Sha256': 'firma-falsa-si-no-validas', // Si usas HMAC puedes poner aquí la real
      }
    });

    console.log('Respuesta del webhook Shopify:\n', response.data);
  } catch (error) {
    console.error('Error al probar webhook Shopify:', error.response?.data || error.message);
  }
}

// Ejecutar ambas pruebas
testChatbot();
testShopifyOrder();
