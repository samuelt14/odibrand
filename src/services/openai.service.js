const OpenAI = require('openai');
const config = require('../../config');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || config.OPENAI_API_KEY,
});

exports.getRespuestaIA = async (mensaje) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente amigable para una tienda Shopify.' },
        { role: 'user', content: mensaje }
      ],
      temperature: 0.7,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error con OpenAI:', error.message);
    throw error;
  }
};
