require('dotenv').config();

module.exports = {
  // Puerto del servidor
  PORT: process.env.PORT || 3000,

  // Configuración de MySQL
  MYSQL_CONFIG: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'chatbot',
    port: process.env.DB_PORT || 3306
  },

  // Clave API de OpenAI
  OPENAI_KEY: process.env.OPENAI_API_KEY || '',

  // Configuración de Shopify
  SHOPIFY: {
    STORE: process.env.SHOPIFY_STORE || '',
    ADMIN_API_KEY: process.env.SHOPIFY_ADMIN_API_KEY || '',
    WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET || ''
  },

  // Configuración de WhatsApp Business API
  WHATSAPP: {
    TOKEN: process.env.WHATSAPP_TOKEN || '',
    PHONE_ID: process.env.WHATSAPP_PHONE_ID || '',
    BUSINESS_ID: process.env.WHATSAPP_BUSINESS_ID || ''
  },

  // Correo SMTP (opcional)
  EMAIL: {
    USER: process.env.EMAIL_USER || '',
    PASS: process.env.EMAIL_PASS || '',
    HOST: process.env.MAIL_HOST || '',
    PORT: process.env.MAIL_PORT || 587,
    SECURE: process.env.MAIL_SECURE === 'true'
  },

  // URL base del backend
  BASE_API_URL: process.env.BASE_API_URL || ''
};
