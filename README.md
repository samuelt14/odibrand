
# 🤖 Chatbot AI para Shopify y WhatsApp con n8n

Este proyecto integra un chatbot con **Shopify**, **WhatsApp Business API** y **n8n**, permitiendo a una empresa pequeña automatizar respuestas y consultar productos desde WhatsApp usando inteligencia artificial.

---

## 📦 Tecnologías usadas

- Node.js (Express)
- OpenAI API (GPT-4 / GPT-3.5)
- Shopify Admin API
- WhatsApp Business Cloud API
- n8n (automatización)
- MySQL (logs opcionales)
- dotenv, axios, morgan

---

## ⚙️ Configuración del entorno

### `.env`

```env
# Puerto del servidor
PORT=3000

# OpenAI
OPENAI_API_KEY=sk-...

# Shopify
SHOPIFY_STORE=tu credencial
SHOPIFY_ADMIN_API_KEY=tu credencial
SHOPIFY_WEBHOOK_SECRET=tu credencial

# WhatsApp (Meta)
WHATSAPP_TOKEN=EAASICdOulLgB...
WHATSAPP_PHONE_ID=666477043223088
WHATSAPP_BUSINESS_ID=1275448987593212

# URL base
BASE_API_URL=https://samuelt14.app.n8n.cloud
```

---

## 🧠 ¿Qué hace el bot?

- Recibe mensajes por WhatsApp como “¿Qué productos tienen?”
- Consulta productos en Shopify
- Responde al usuario con los nombres y precios
- Si no se trata de productos, usa OpenAI para responder como un chatbot
- Guarda logs en base de datos (opcional)

---

## 🧩 Estructura principal

```
Odibrand/
├── app.js                # Entrada principal
├── config.js             # Config global
├── .env                  # Variables de entorno
├── src/
│   ├── api/
│   │   ├── index.js
│   │   ├── chatbot.routes.js
│   │   └── shopify.routes.js
│   ├── services/
│   │   ├── openai.service.js
│   │   ├── shopify.service.js
│   │   └── db.service.js
│   └── utils/
│       └── formatMessage.js
```

---

## 🌐 Conexión con WhatsApp vía n8n

### 1. Webhook de entrada

- Nodo: **Webhook**
- Path: `/whatsapp-in`
- Método: `POST`

### 2. Nodo HTTP Request → Chatbot

- URL: `http://localhost:3000/api/chatbot/responder`
- Body: `{ "mensaje": "{{mensaje_recibido}}" }`

### 3. Nodo HTTP Request → WhatsApp

- URL: `https://graph.facebook.com/v19.0/{PHONE_ID}/messages`
- Headers: Authorization + Content-Type
- Body: JSON con número y respuesta del chatbot

### 4. Activa el flujo y usa la URL pública como webhook en Meta Developers

---

## 💲 ¿Cuánto cuesta mantenerlo?

- **OpenAI**: desde $0.0015 por 1K tokens (GPT-3.5) o $0.03 para GPT-4. Verifica: [pricing](https://platform.openai.com/docs/pricing)
- **n8n Cloud**: desde $20/mes
- **Meta WhatsApp Business API**: puede requerir verificación empresarial y números aprobados.

---

## 🧪 Test rápido local

```bash
curl -X POST http://localhost:3000/api/chatbot/responder -H "Content-Type: application/json" -d '{"mensaje": "¿Qué productos tienen disponibles?"}'
```

---

