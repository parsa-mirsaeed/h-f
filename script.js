(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const tilt = document.getElementById('art-tilt');
  const form = document.getElementById('inquiry-form');
  const feedback = document.getElementById('form-feedback');
  const formNote = document.getElementById('form-note');
  const submitLabel = document.getElementById('submit-label');
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
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
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

  const officialEmail = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email.trim()) ? config.email.trim() : '';
  if (officialEmail) {
    formNote.textContent = 'Your information stays on your device. We will open your mail app with a prepared message addressed to ' + officialEmail + '. Please review and send it there; this site does not send anything automatically.';
  }

  const fields = {
    name: document.getElementById('inquiry-name'),
    company: document.getElementById('inquiry-company'),
    email: document.getElementById('inquiry-email'),
    message: document.getElementById('inquiry-message')
  };
  function setError(key, message) {
    const element = fields[key];
    if (!element) return;
    const error = document.getElementById(key + '-error');
    if (error) error.textContent = message;
    if (message) { element.setAttribute('aria-invalid', 'true'); element.setAttribute('aria-describedby', key + '-error'); }
    else { element.removeAttribute('aria-invalid'); element.removeAttribute('aria-describedby'); }
  }
  function validate() {
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();
    const errors = {
      name: name ? '' : 'Please enter your name.',
      email: !email ? 'Please enter your email address.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please enter a valid email address.' : '',
      message: message ? '' : 'Please write a short message.'
    };
    Object.keys(errors).forEach(key => setError(key, errors[key]));
    const firstInvalid = Object.keys(errors).find(key => errors[key]);
    if (firstInvalid) { fields[firstInvalid].focus(); return false; }
    return true;
  }
  Object.entries(fields).forEach(([key, field]) => {
    if (key !== 'company') field.addEventListener('input', () => { setError(key, ''); feedback.textContent = ''; });
  });
  function preparedMessage() {
    return [
      'To: Hambazan Farhikhte',
      'Subject: Business inquiry from ' + fields.name.value.trim(),
      '',
      'Name: ' + fields.name.value.trim(),
      'Organization: ' + (fields.company.value.trim() || 'Not specified'),
      'Reply-to: ' + fields.email.value.trim(),
      '',
      'Message:',
      fields.message.value.trim()
    ].join('\n');
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate()) return;
    const subject = 'Business inquiry — Hambazan Farhikhte';
    const body = preparedMessage().replace(/^To: Hambazan Farhikhte\nSubject: [^\n]+\n\n/, '');
    const href = 'mailto:' + (officialEmail || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = href;
    feedback.textContent = officialEmail
      ? 'Your email draft is ready. Review it and press Send in your email application.'
      : 'Your email draft is ready. Add the recipient address in your email application before sending.';
  });
  document.getElementById('copy-inquiry').addEventListener('click', async () => {
    if (!validate()) return;
    const message = preparedMessage();
    try {
      await navigator.clipboard.writeText(message);
      feedback.textContent = 'Copied. You can paste the inquiry into your preferred communication channel.';
    } catch (error) {
      const selection = document.createElement('textarea');
      selection.value = message;
      selection.setAttribute('aria-label', 'Prepared inquiry to copy');
      selection.style.cssText = 'position:fixed;left:10px;top:10px;width:80%;z-index:200;';
      document.body.appendChild(selection);
      selection.focus();
      selection.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* manual copy remains available */ }
      if (copied) {
        selection.remove();
        feedback.textContent = 'Copied. You can paste the inquiry into your preferred communication channel.';
      } else {
        feedback.textContent = 'Select the prepared message and copy it, then paste it into your communication channel.';
      }
    }
  });
})();
