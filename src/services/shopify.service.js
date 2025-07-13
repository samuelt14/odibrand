const axios = require('axios');
const config = require('../../config');

// 🛠 Extraer datos correctamente desde el objeto anidado
const SHOPIFY_STORE = config.SHOPIFY.STORE;
const SHOPIFY_ADMIN_API_KEY = config.SHOPIFY.ADMIN_API_KEY;

const shopifyApi = axios.create({
  baseURL: `https://${SHOPIFY_STORE}.myshopify.com/admin/api/2023-07`,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_KEY,
    'Content-Type': 'application/json'
  }
});

/**
 * Consulta productos disponibles desde Shopify
 * @returns {Promise<Array>} Lista de productos básicos con título y precio
 */
exports.obtenerProductos = async () => {
  try {
    const response = await shopifyApi.get('/products.json?limit=5');
    const productos = response.data.products;

    return productos.map(prod => ({
      id: prod.id,
      title: prod.title,
      price: prod.variants?.[0]?.price,
      inventory: prod.variants?.[0]?.inventory_quantity
    }));
  } catch (error) {
    console.error('❌ Error al obtener productos de Shopify:', error.message);
    return [];
  }
};
