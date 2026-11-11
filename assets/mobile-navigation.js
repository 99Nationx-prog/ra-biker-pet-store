/* RA BIKER responsive navigation: works in storefront and Shopify editor. */
(() => {
  let lastTrigger = null;
  const getParts = () => ({
    toggle: document.querySelector('[data-mobile-menu-toggle]'),
    menu: document.getElementById('MobileMenu')
  });
  function closeMenu(restoreFocus = false) {
    const { toggle, menu } = getParts();
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    menu.hidden = true;
    if (restoreFocus && lastTrigger?.isConnected) lastTrigger.focus();
  }
  function openMenu() {
    const { toggle, menu } = getParts();
    if (!toggle || !menu) return;
    lastTrigger = toggle;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    menu.hidden = false;
    menu.querySelector('a')?.focus();
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-mobile-menu-toggle]');
    if (trigger) {
      event.preventDefault();
      const { menu } = getParts();
      if (menu?.hidden) openMenu();
      else closeMenu(true);
      return;
    }
    const { menu } = getParts();
    if (menu && !menu.hidden && !event.target.closest('#MobileMenu')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const { menu } = getParts();
      if (menu && !menu.hidden) { event.preventDefault(); closeMenu(true); }
    }
  });
  document.addEventListener('shopify:section:load', () => closeMenu());
  document.addEventListener('shopify:section:unload', () => closeMenu());
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
