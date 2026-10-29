(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const tilt = document.getElementById('art-tilt');
  const config = window.HF_CONFIG || {};
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
    document.documentElement.classList.add('js-motion');
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  function syncScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('is-sticky', y > 24);
    const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, y / available)) + ')';
  }
  let framePending = false;
  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(() => { syncScroll(); framePending = false; });
  }, { passive: true });
  syncScroll();

  function closeMenu(returnFocus = false) {
    if (mobileNav.hidden) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', window.HF_I18N?.t('menuOpen') || 'Open navigation');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', window.HF_I18N?.t(open ? 'menuClose' : 'menuOpen') || (open ? 'Close navigation' : 'Open navigation'));
    if (open) window.HF_I18N?.close();
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !header.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 651px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: .1 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  if (tilt && !prefersReducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
    const parent = tilt.parentElement;
    parent.addEventListener('pointermove', event => {
      const bounds = parent.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      tilt.style.transform = 'rotateY(' + (x * 9).toFixed(2) + 'deg) rotateX(' + (-y * 9).toFixed(2) + 'deg)';
    });
    parent.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
  }

  // Contact details are always informational. Values render as plain text,
  // and direct call/email/map links appear only for valid published details.
  function setDetail(kind, value, href) {
    const element = document.getElementById('contact-' + kind);
    const note = document.getElementById('contact-' + kind + '-note');
    const link = document.getElementById('contact-' + kind + '-link');
    if (!element || !link) return;
    const published = Boolean(value);
    if (published) {
      element.textContent = value;
      element.classList.remove('directory-unconfirmed');
      link.href = href;
      link.hidden = false;
    }
    if (note) note.hidden = published;
  }

  const asText = value => typeof value === 'string' ? value.trim() : '';
  const phone = asText(config.phone);
  const phoneHref = /^[+\d\s().-]{5,30}$/.test(phone) ? 'tel:' + phone.replace(/[^+\d]/g, '') : '';
  const address = asText(config.address || config.location);
  const email = asText(config.email);
  const emailHref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'mailto:' + email : '';
  // If a field is populated but its syntax cannot be used for a direct link,
  // show the text rather than constructing an unsafe or broken href.
  setDetail('phone', phone, phoneHref || '');
  setDetail('address', address, address ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address) : '');
  setDetail('email', email, emailHref || '');
  if (phone && !phoneHref) document.getElementById('contact-phone-link').hidden = true;
  if (email && !emailHref) document.getElementById('contact-email-link').hidden = true;

  const person = asText(config.contactPerson);
  if (person) {
    document.getElementById('contact-person').textContent = person;
    document.getElementById('contact-person-entry').hidden = false;
  }

})();
