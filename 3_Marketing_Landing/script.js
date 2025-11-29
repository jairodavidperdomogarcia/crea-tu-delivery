// Roadmap dinámico
const planPorSecciones = {
  fase1: " Estructura Base (AHORA)",
  fase2: " Marketing & Landing",
  fase3: " Contenido Curso",
  fase4: " Recursos Visuales",
  fase5: " Comunidad",
  fase6: " Administración"
};

(function renderRoadmap() {
  const container = document.getElementById('roadmap-list');
  if (!container) return;
  Object.values(planPorSecciones).forEach((label, idx) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border bg-white shadow-sm flex items-center';
    const badge = document.createElement('span');
    badge.className = 'mr-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-primary text-xl';
    badge.textContent = label.split(' ')[0]; // emoji
    const text = document.createElement('div');
    text.className = 'font-medium text-gray-800';
    text.textContent = label;
    card.appendChild(badge);
    card.appendChild(text);
    if (label.includes('AHORA')) {
      card.className += ' ring-2 ring-secondary';
    }
    container.appendChild(card);
  });
})();

// Tracking GA4 de interacciones clave
(function setupAnalyticsTracking() {
  // Helper para enviar eventos solo si gtag está disponible
  function sendEvent(name, params) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', name, params || {});
      }
    } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Clics hacia Telegram
    const telegramLinks = document.querySelectorAll('a[href^="https://t.me/creatudelivery"]');
    telegramLinks.forEach(a => {
      a.addEventListener('click', () => {
        sendEvent('click_telegram', { location: a.closest('section')?.id || 'header_footer' });
      });
    });

    // CTAs que llevan a #contacto
    const contactCtas = document.querySelectorAll('a[href="#contacto"], a[href^="./index.html#contacto"]');
    contactCtas.forEach(a => {
      a.addEventListener('click', () => {
        sendEvent('click_cta_contacto', { location: a.closest('section')?.id || 'header' });
      });
    });

    // Compartir en Twitter y WhatsApp
    const twitterLinks = document.querySelectorAll('a[href^="https://twitter.com/intent/tweet"]');
    twitterLinks.forEach(a => {
      a.addEventListener('click', () => sendEvent('share_twitter', { location: a.closest('section')?.id || 'header_footer' }));
    });
    const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    waLinks.forEach(a => {
      a.addEventListener('click', () => sendEvent('share_whatsapp', { location: a.closest('section')?.id || 'header_footer' }));
    });

    // Envío del formulario (sin enviar PII)
    const form = document.querySelector('form[action^="https://formsubmit.co/"]');
    if (form) {
      form.addEventListener('submit', () => {
        sendEvent('form_submit', { form_id: form.getAttribute('action') });
      });
    }
  });
})();
