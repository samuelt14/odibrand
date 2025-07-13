(function () {
  // Evita cargar el widget múltiples veces
  if (window.chatbotLoaded) return;
  window.chatbotLoaded = true;

  // Crear el botón flotante
  const button = document.createElement('div');
  button.id = 'chatbot-button';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.width = '60px';
  button.style.height = '60px';
  button.style.backgroundColor = '#4CAF50';
  button.style.borderRadius = '50%';
  button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  button.style.cursor = 'pointer';
  button.style.zIndex = '9999';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';

  // Icono dentro del botón (puedes usar una imagen o SVG)
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M2 2v20l4-4h16V2H2zm2 2h16v12H5.17L4 17.17V4z"/></svg>`;

  // Crear el iframe del chat
  const iframe = document.createElement('iframe');
  iframe.id = 'chatbot-iframe';
  iframe.src = 'https://tu-dominio.com/chat'; // Cambia por la URL de tu frontend del chatbot
  iframe.style.position = 'fixed';
  iframe.style.bottom = '90px';
  iframe.style.right = '20px';
  iframe.style.width = '360px';
  iframe.style.height = '500px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '10px';
  iframe.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
  iframe.style.zIndex = '9998';
  iframe.style.display = 'none'; // Oculto por defecto

  // Añadir elementos al DOM
  document.body.appendChild(button);
  document.body.appendChild(iframe);

  // Lógica de abrir/cerrar
  let isOpen = false;
  button.addEventListener('click', () => {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
  });
})();
