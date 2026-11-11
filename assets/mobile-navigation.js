/* RA BIKER accessible off-canvas navigation drawer. */
(() => {
  let lastTrigger = null;
  const parts = () => ({
    toggle: document.querySelector('[data-mobile-menu-toggle]'),
    menu: document.getElementById('MobileMenu'),
    overlay: document.querySelector('[data-mobile-menu-overlay]')
  });
  function closeMenu(restoreFocus = false) {
    const { toggle, menu, overlay } = parts();
    if (!menu) return;
    menu.hidden = true;
    if (overlay) overlay.hidden = true;
    document.body.classList.remove('mobile-drawer-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open shopping menu');
    }
    if (restoreFocus && lastTrigger?.isConnected) lastTrigger.focus();
  }
  function openMenu() {
    const { toggle, menu, overlay } = parts();
    if (!menu || !toggle) return;
    lastTrigger = toggle;
    menu.hidden = false;
    if (overlay) overlay.hidden = false;
    document.body.classList.add('mobile-drawer-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close shopping menu');
    menu.querySelector('[data-mobile-menu-close]')?.focus();
  }
  document.addEventListener('click', event => {
    if (event.target.closest('[data-mobile-menu-toggle]')) {
      event.preventDefault();
      const { menu } = parts();
      if (menu?.hidden) openMenu();
      else closeMenu(true);
    } else if (event.target.closest('[data-mobile-menu-close], [data-mobile-menu-overlay]')) {
      event.preventDefault();
      closeMenu(true);
    } else if (event.target.closest('#MobileMenu a')) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', event => {
    const { menu } = parts();
    if (!menu || menu.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === 'Tab') {
      const focusable = [...menu.querySelectorAll('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  document.addEventListener('shopify:section:load', () => closeMenu());
  document.addEventListener('shopify:section:unload', () => closeMenu());
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
})();
