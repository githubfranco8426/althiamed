'use strict';
(() => {
  const messages = {
    direct: 'Hola, quiero agendar una hora médica en Althia Med.',
    instagram: 'Hola, vi Althia Med en Instagram y quiero agendar una hora médica.',
    google: 'Hola, encontré Althia Med en Google y quiero consultar disponibilidad.',
    pendon: 'Hola, vi el pendón de Althia Med y quiero agendar una hora.',
    medicina_general: 'Hola, vi la campaña de Medicina General y quiero agendar.'
  };
  const params = new URLSearchParams(location.search);
  const requested = params.get('canal') || params.get('utm_source');
  const channel = params.get('utm_campaign') === 'medicina_general' ? 'medicina_general' : Object.hasOwn(messages, requested) ? requested : 'direct';
  const services = { 'medicina-general': 'Medicina General', 'ninos-adolescentes': 'atención para niños y adolescentes', 'adultos-mayores': 'atención para adultos y adultos mayores', 'controles-evaluaciones': 'controles y evaluaciones médicas' };
  // In-memory events only. No cookies, storage, requests, URLs or patient data.
  window.dataLayer = window.dataLayer || [];
  const track = (event, position, service) => {
    const payload = { event, channel, location: position };
    if (service) payload.service = service;
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('althiamed:analytics', { detail: payload }));
  };
  document.querySelectorAll('[data-wa]').forEach(link => {
    const service = link.dataset.service;
    const message = service ? `${messages[channel]} Quiero consultar disponibilidad de ${services[service]}.` : messages[channel];
    link.href = `https://wa.me/56983841630?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-wa], a[data-event]');
    if (!link) return;
    if (link.dataset.service) track('specialty_click', link.dataset.location, link.dataset.service);
    track(link.hasAttribute('data-wa') ? 'whatsapp_click' : link.dataset.event, link.dataset.location, link.dataset.service);
  });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mobile-nav');
  function closeMenu() { nav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !nav.hidden) { closeMenu(); toggle.focus(); } });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.querySelector('#load-map').addEventListener('click', () => {
    track('map_click', 'embedded-map');
    const panel = document.querySelector('#map-panel');
    const frame = document.createElement('iframe');
    frame.title = 'Mapa de Clínica del Mar, José Francisco Vergara 3391, Iquique';
    frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent('Clínica del Mar, José Francisco Vergara 3391, Iquique, Chile') + '&output=embed';
    frame.referrerPolicy = 'no-referrer';
    frame.allowFullscreen = true;
    panel.replaceChildren(frame);
    panel.classList.add('loaded');
    frame.focus();
  });
  const openPrivacy = () => { document.querySelector('#privacidad details').open = true; };
  document.querySelector('#privacy-link').addEventListener('click', openPrivacy);
  if (location.hash === '#privacidad') openPrivacy();
  track('page_view', 'landing');
})();
