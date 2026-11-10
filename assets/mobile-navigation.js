(() => {
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  const menu = document.getElementById('MobileMenu');
  if (!toggle || !menu) return;
  const close = () => { toggle.setAttribute('aria-expanded','false'); menu.hidden = true; };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded',String(open));
    menu.hidden = !open;
    if (open) menu.querySelector('a')?.focus();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) { close(); toggle.focus(); }
  });
  document.addEventListener('click', e => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) close();
  });
})();