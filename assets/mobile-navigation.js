/* RA BIKER mobile navigation: initialized once and resilient to Shopify editor updates. */
(() => {
  if (window.__raBikerMobileNavigation) return;
  window.__raBikerMobileNavigation = true;
  const find = () => ({
    toggle: document.querySelector('[data-mobile-menu-toggle]'),
    menu: document.getElementById('MobileMenu'),
    overlay: document.querySelector('[data-mobile-menu-overlay]')
  });
  let previousFocus = null;
  function setOpen(open, restoreFocus = false) {
    const {toggle, menu, overlay} = find();
    if (!menu || !toggle) return;
    if (open) previousFocus = document.activeElement;
    menu.hidden = !open;
    if (overlay) overlay.hidden = !open;
    document.body.classList.toggle('mobile-drawer-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close shopping menu' : 'Open shopping menu');
    if (open) menu.querySelector('[data-mobile-menu-close]')?.focus();
    else if (restoreFocus && previousFocus?.isConnected) previousFocus.focus();
  }
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-mobile-menu-toggle]')) {
      event.preventDefault();
      setOpen(find().menu?.hidden !== false);
    } else if (target.closest('[data-mobile-menu-close], [data-mobile-menu-overlay]')) {
      event.preventDefault();
      setOpen(false, true);
    } else if (target.closest('#MobileMenu a')) {
      setOpen(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    const {menu} = find();
    if (!menu || menu.hidden) return;
    if (event.key === 'Escape') {event.preventDefault(); setOpen(false, true); return;}
    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('a[href], button:not([disabled]), summary')];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
  });
  document.addEventListener('shopify:section:load', () => setOpen(false));
  document.addEventListener('shopify:section:unload', () => setOpen(false));
  window.addEventListener('resize', () => {if (window.innerWidth > 900) setOpen(false);});
})();
