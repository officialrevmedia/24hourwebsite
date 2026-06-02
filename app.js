// 24hourwebsite.ca interactions

// 1) Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });
}

// 2) Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 3) Hero countdown loop (decorative, counts 24:00 down to 00:00 then resets)
const cdHrs = document.getElementById('cdHours');
const cdMin = document.getElementById('cdMins');
const cdFill = document.getElementById('cdFill');
if (cdHrs && cdMin && cdFill) {
  const TOTAL = 24 * 60; // total minutes
  const DURATION = 28000; // ms per loop
  let start = performance.now();
  const tick = (t) => {
    const elapsed = (t - start) % DURATION;
    const progress = elapsed / DURATION;
    const remaining = TOTAL * (1 - progress);
    const h = Math.floor(remaining / 60);
    const m = Math.floor(remaining % 60);
    cdHrs.textContent = String(h).padStart(2, '0');
    cdMin.textContent = String(m).padStart(2, '0');
    cdFill.style.width = (progress * 100).toFixed(2) + '%';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// 4) Subtle parallax on hero shapes
const shapeA = document.querySelector('.shape-a');
const shapeB = document.querySelector('.shape-b');
if (shapeA && shapeB && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 1200) return;
    shapeA.style.transform = `translate(${y * 0.05}px, ${y * 0.12}px)`;
    shapeB.style.transform = `translate(${-y * 0.04}px, ${-y * 0.08}px)`;
  }, { passive: true });
}

// 5) Pointer parallax tilt on float-cards
const cards = document.querySelectorAll('[data-tilt]');
const heroRight = document.querySelector('.hero-right');
if (heroRight && cards.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroRight.addEventListener('pointermove', (e) => {
    const rect = heroRight.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    cards.forEach((card, i) => {
      const depth = (i % 3 + 1) * 4;
      card.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  });
  heroRight.addEventListener('pointerleave', () => {
    cards.forEach(c => c.style.transform = '');
  });
}

// 6) Form submit -> sends intake to info@revmedia.ca via FormSubmit (AJAX, no page leave)
const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const label = btn.querySelector('.btn-label');
    const originalText = label.textContent;
    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return; // bot trap

    label.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@revmedia.ca', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('bad status');
      label.textContent = 'Sent to info@revmedia.ca';
      btn.style.background = '#0A4514';
      form.reset();
      setTimeout(() => {
        label.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 5000);
    } catch (err) {
      // Fallback: native submit (redirects via FormSubmit _next)
      label.textContent = 'Opening...';
      form.submit();
    }
  });
}

// 7) Hide sticky CTA when form is on screen (avoid covering the actual button)
const startSection = document.getElementById('start');
const sticky = document.querySelector('.sticky-mobile');
if (startSection && sticky) {
  const obs = new IntersectionObserver(([entry]) => {
    sticky.style.transform = entry.isIntersecting ? 'translateY(120%)' : '';
    sticky.style.opacity = entry.isIntersecting ? '0' : '';
  }, { threshold: 0.1 });
  obs.observe(startSection);
}
