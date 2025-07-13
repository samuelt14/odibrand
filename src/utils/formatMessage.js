/**
 * Limpia y estructura el mensaje de entrada del usuario
 * @param {string} mensaje - El mensaje original recibido del cliente
 * @returns {string} mensaje formateado
 */
function limpiarMensaje(mensaje) {
  if (!mensaje || typeof mensaje !== 'string') return '';

  let texto = mensaje.trim();

  // Elimina espacios duplicados
  texto = texto.replace(/\s+/g, ' ');

  // Elimina emojis si es necesario
  texto = texto.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+/g, '');

  // Elimina caracteres no imprimibles
  texto = texto.replace(/[^\x20-\x7EáéíóúÁÉÍÓÚñÑ¿¡]/g, '');

  return texto;
}

/**
 * Convierte el mensaje en un contexto estándar para la IA
 * @param {string} mensaje
 * @returns {string}
 */
function crearPromptConContexto(mensaje) {
  const limpio = limpiarMensaje(mensaje);
  return `Cliente: ${limpio}\nAsistente:`;
}

module.exports = {
  limpiarMensaje,
  crearPromptConContexto
};
