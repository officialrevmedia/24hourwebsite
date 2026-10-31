/* Wild pill hero: hairline -> slit -> circle -> stadium reveal, plus the portfolio slideshow inside the pill. */
(function () {
  var hero = document.querySelector('[data-wild]');
  if (!hero) return;
  var pill = hero.querySelector('.w-pill');
  var word = hero.querySelector('.w-word');
  var hair = hero.querySelector('.w-hair');
  var bg = hero.querySelector('.w-bg');
  var nav = hero.querySelector('.w-nav');
  var foot = hero.querySelector('.w-foot');
  var rule = hero.querySelector('.w-rule');
  var fades = hero.querySelectorAll('.w-ic, .w-cap');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var D = 2100, anims = [], started = false;

  function done() {
    hero.classList.add('w-done');
    anims.forEach(function (a) { try { a.cancel(); } catch (e) {} });
    anims = [];
    startSlides();
  }

  function play() {
    if (started) return;
    started = true;
    if (reduce || !pill.animate) { done(); return; }
    var fs = parseFloat(getComputedStyle(word).fontSize);
    var phone = window.matchMedia('(max-width: 720px), (max-width: 1024px) and (orientation: portrait)').matches;
    var o = { duration: D, fill: 'both' };
    var add = function (el, kf) { if (el) anims.push(el.animate(kf, o)); };
    if (!phone) {
      add(pill, [
        { width: 0.012 * fs + 'px', clipPath: 'inset(50% 0 round 999px)', offset: 0 },
        { width: 0.012 * fs + 'px', clipPath: 'inset(0% 0 round 999px)', offset: 0.14, easing: 'cubic-bezier(.5,0,.3,1)' },
        { width: 0.16 * fs + 'px', clipPath: 'inset(0% 0 round 999px)', offset: 0.30, easing: 'cubic-bezier(.45,0,.3,1)' },
        { width: 1.81 * fs + 'px', clipPath: 'inset(0% 0 round 999px)', offset: 0.58, easing: 'cubic-bezier(.4,0,.2,1)' },
        { width: 3.62 * fs + 'px', clipPath: 'inset(0% 0 round 999px)', offset: 1 }
      ]);
      add(word, [
        { columnGap: 0.026 * fs + 'px', offset: 0 },
        { columnGap: 0.026 * fs + 'px', offset: 0.14 },
        { columnGap: 0.05 * fs + 'px', offset: 0.58 },
        { columnGap: 0.085 * fs + 'px', offset: 1 }
      ]);
    } else {
      var H = pill.parentNode.clientWidth / 1.85;
      add(pill, [
        { height: '1.5px', clipPath: 'inset(0 50% round 999px)', offset: 0 },
        { height: '1.5px', clipPath: 'inset(0 0% round 999px)', offset: 0.14, easing: 'cubic-bezier(.5,0,.3,1)' },
        { height: 0.10 * H + 'px', clipPath: 'inset(0 0% round 999px)', offset: 0.30, easing: 'cubic-bezier(.45,0,.3,1)' },
        { height: 0.55 * H + 'px', clipPath: 'inset(0 0% round 999px)', offset: 0.58, easing: 'cubic-bezier(.4,0,.2,1)' },
        { height: H + 'px', clipPath: 'inset(0 0% round 999px)', offset: 1 }
      ]);
      add(word, [
        { rowGap: 0.03 * fs + 'px', offset: 0 },
        { rowGap: 0.03 * fs + 'px', offset: 0.14 },
        { rowGap: 0.1 * fs + 'px', offset: 1 }
      ]);
    }
    add(hair, [{ opacity: 1, offset: 0 }, { opacity: 1, offset: 0.14 }, { opacity: 0, offset: 0.30 }, { opacity: 0, offset: 1 }]);
    add(bg, [{ opacity: 0, offset: 0 }, { opacity: 0, offset: 0.45 }, { opacity: 1, offset: 0.78 }, { opacity: 1, offset: 1 }]);
    add(nav, [{ transform: 'translateY(-140%)', opacity: 0, offset: 0 }, { transform: 'translateY(-140%)', opacity: 0, offset: 0.5, easing: 'cubic-bezier(.2,.8,.2,1)' }, { transform: 'none', opacity: 1, offset: 0.86 }, { transform: 'none', opacity: 1, offset: 1 }]);
    add(foot, [{ transform: 'translateY(160%)', opacity: 0, offset: 0 }, { transform: 'translateY(160%)', opacity: 0, offset: 0.52, easing: 'cubic-bezier(.2,.8,.2,1)' }, { transform: 'none', opacity: 1, offset: 0.90 }, { transform: 'none', opacity: 1, offset: 1 }]);
    add(rule, [{ transform: 'scaleX(0)', offset: 0 }, { transform: 'scaleX(0)', offset: 0.40, easing: 'cubic-bezier(.4,0,.2,1)' }, { transform: 'scaleX(1)', offset: 0.95 }, { transform: 'scaleX(1)', offset: 1 }]);
    fades.forEach(function (el) { add(el, [{ opacity: 0, offset: 0 }, { opacity: 0, offset: 0.8 }, { opacity: 1, offset: 1 }]); });
    // Lock in the final state, then hand control back to CSS so resizing stays fluid.
    anims[0].finished.then(function () { setTimeout(done, 40); }).catch(function () {});
  }

  // Resizing mid-reveal finishes the animation immediately.
  window.addEventListener('resize', function () { if (anims.length) done(); });

  // Start once fonts are ready (never wait more than 700ms).
  var go = function () { requestAnimationFrame(function () { requestAnimationFrame(play); }); };
  if (document.fonts && document.fonts.ready) {
    var t = setTimeout(go, 700);
    document.fonts.ready.then(function () { clearTimeout(t); go(); });
  } else { go(); }

  /* ---- Slideshow inside the pill ---- */
  var imgs = Array.prototype.slice.call(hero.querySelectorAll('.w-media img'));
  var cap = hero.querySelector('.w-cap');
  var pauseBtn = hero.querySelector('[data-pause]');
  var nextBtn = hero.querySelector('[data-next]');
  var i = 0, timer = 0, paused = reduce, slidesOn = false, inView = true;
  function hydrate(img) {
    if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
    if (img.dataset.srcset) { img.srcset = img.dataset.srcset; img.removeAttribute('data-srcset'); }
  }
  function show(n) {
    imgs[i].classList.remove('on');
    i = (n + imgs.length) % imgs.length;
    hydrate(imgs[i]);
    hydrate(imgs[(i + 1) % imgs.length]);
    imgs[i].classList.add('on');
    if (cap) { cap.textContent = imgs[i].dataset.cap; cap.href = imgs[i].dataset.href; }
  }
  function tick() { clearTimeout(timer); if (!paused && inView && !document.hidden) timer = setTimeout(function () { show(i + 1); tick(); }, 3400); }
  function startSlides() {
    if (slidesOn || imgs.length < 2) return;
    slidesOn = true;
    hydrate(imgs[1]);
    tick();
  }
  if (pauseBtn) pauseBtn.addEventListener('click', function () {
    paused = !paused;
    pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    pauseBtn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    tick();
  });
  if (pauseBtn && paused) { pauseBtn.setAttribute('aria-pressed', 'true'); pauseBtn.setAttribute('aria-label', 'Play slideshow'); }
  if (nextBtn) nextBtn.addEventListener('click', function () { show(i + 1); tick(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; tick(); }).observe(pill);
  document.addEventListener('visibilitychange', tick);
})();
