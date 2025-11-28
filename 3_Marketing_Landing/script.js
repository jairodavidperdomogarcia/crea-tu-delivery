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
