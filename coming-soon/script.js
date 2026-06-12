/* ===========================================================================
   Wafi — Coming Soon · interacciones
   Vanilla JS, sin dependencias. Respeta prefers-reduced-motion.
   =========================================================================== */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine   = window.matchMedia('(pointer: fine)').matches;
  const body   = document.body;

  /* ------------------------------- Reveal -------------------------------- */
  const reveal = () => requestAnimationFrame(() => body.classList.add('loaded'));
  if (document.readyState === 'complete') reveal();
  else window.addEventListener('load', reveal);
  // failsafe: nunca quedarse en blanco si 'load' tarda
  setTimeout(() => body.classList.add('loaded'), 1200);

  /* ------------------------- Stamp card: llenado ------------------------- */
  const STAMP_COUNT = 8;
  const stampsEl  = document.getElementById('stamps');
  const countEl   = document.getElementById('count');
  const cardEl    = document.getElementById('card');
  const sparklesEl = document.getElementById('sparkles');
  const dots = [];

  if (stampsEl) {
    for (let i = 0; i < STAMP_COUNT; i++) {
      const d = document.createElement('div');
      d.className = 'stamp' + (i === STAMP_COUNT - 1 ? ' reward-slot' : '');
      d.innerHTML = `<span class="stamp-num">${i + 1}</span><span class="stamp-fill"></span>`;
      stampsEl.appendChild(d);
      dots.push(d);
    }
  }

  let filled = 0;
  let loopTimer = null;

  function setComplete(on) {
    if (!cardEl) return;
    cardEl.classList.toggle('complete', on);
  }

  function fillAllStatic() {
    dots.forEach(d => d.classList.add('on'));
    if (countEl) countEl.textContent = STAMP_COUNT;
    setComplete(true);
  }

  function burst() {
    if (!sparklesEl || reduce) return;
    sparklesEl.innerHTML = '';
    const N = 16;
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span');
      s.className = 'spark-bit';
      const ang = (Math.PI * 2 * i) / N + (i % 2 ? 0.3 : 0);
      const dist = 70 + (i % 4) * 26;
      s.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
      s.style.setProperty('--dy', `${Math.sin(ang) * dist}px`);
      s.style.animationDelay = `${(i % 5) * 0.03}s`;
      sparklesEl.appendChild(s);
    }
    setTimeout(() => (sparklesEl.innerHTML = ''), 1100);
  }

  function reset() {
    filled = 0;
    if (countEl) countEl.textContent = '0';
    dots.forEach(d => d.classList.remove('on'));
    setComplete(false);
  }

  function step() {
    if (filled < STAMP_COUNT) {
      dots[filled].classList.add('on');
      filled++;
      if (countEl) countEl.textContent = String(filled);
      if (filled === STAMP_COUNT) {
        setComplete(true);
        burst();
        loopTimer = setTimeout(() => { reset(); loopTimer = setTimeout(step, 1100); }, 2800);
        return;
      }
    }
    loopTimer = setTimeout(step, 820);
  }

  if (dots.length) {
    if (reduce) fillAllStatic();
    else loopTimer = setTimeout(step, 1500);

    // Pausa el loop cuando la pestaña no está visible (ahorra batería)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { clearTimeout(loopTimer); }
      else if (!reduce) { clearTimeout(loopTimer); loopTimer = setTimeout(step, 600); }
    });
  }

  /* ----------------------- Tilt 3D + parallax tarjeta -------------------- */
  if (fine && !reduce && cardEl) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    function tick() {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      cardEl.style.transform =
        `rotateY(${cx * 16}deg) rotateX(${-cy * 16}deg)`;
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else { raf = null; }
    }
    window.addEventListener('mousemove', onMove, { passive: true });
  }

  /* ------------------------------ Cursor --------------------------------- */
  if (fine) {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring) {
      body.classList.add('has-cursor', 'fine');
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my, raf = null;

      window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
        if (!raf) raf = requestAnimationFrame(ringTick);
      }, { passive: true });

      function ringTick() {
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
        ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
        if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
          raf = requestAnimationFrame(ringTick);
        } else { raf = null; }
      }

      const hoverables = document.querySelectorAll('a, button, input, .stamp-card');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
      });
    }
  }

  /* --------------------------- Botón magnético --------------------------- */
  if (fine && !reduce) {
    const btn = document.getElementById('submit');
    if (btn) {
      const strength = 16;
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    }
  }

  /* --------------------- Campo de partículas (canvas) -------------------- */
  if (!reduce) {
    const canvas = document.getElementById('fx');
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
      let parts = [];
      const COLORS = ['#f143c4', '#ba43ce', '#7743db', '#ffffff', '#b5a1ff'];
      let pointer = { x: -9999, y: -9999 };

      function resize() {
        W = canvas.width = Math.floor(window.innerWidth * dpr);
        H = canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        const target = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 19000));
        parts = [];
        for (let i = 0; i < target; i++) parts.push(spawn());
      }

      function spawn() {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: (Math.random() * 1.6 + 0.5) * dpr,
          vx: (Math.random() - 0.5) * 0.12 * dpr,
          vy: (-Math.random() * 0.28 - 0.05) * dpr,
          a: Math.random() * 0.5 + 0.15,
          tw: Math.random() * Math.PI * 2,
          tws: Math.random() * 0.03 + 0.008,
          c: COLORS[(Math.random() * COLORS.length) | 0],
        };
      }

      window.addEventListener('mousemove', (e) => {
        pointer.x = e.clientX * dpr;
        pointer.y = e.clientY * dpr;
      }, { passive: true });
      window.addEventListener('mouseleave', () => { pointer.x = pointer.y = -9999; });

      let running = true;
      function frame() {
        if (!running) return;
        ctx.clearRect(0, 0, W, H);
        for (const p of parts) {
          // deriva mágica del cursor (atracción suave)
          const ddx = pointer.x - p.x, ddy = pointer.y - p.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < (140 * dpr) * (140 * dpr)) {
            const f = (1 - Math.sqrt(d2) / (140 * dpr)) * 0.5;
            p.x += ddx * 0.0016 * f * 60 * 0.016;
            p.y += ddy * 0.0016 * f * 60 * 0.016;
          }
          p.x += p.vx; p.y += p.vy;
          p.tw += p.tws;
          if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
          if (p.x < -10) p.x = W + 10;
          if (p.x > W + 10) p.x = -10;

          const tw = (Math.sin(p.tw) * 0.5 + 0.5);
          ctx.globalAlpha = p.a * (0.4 + tw * 0.6);
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (0.7 + tw * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(frame);
      }

      let rt;
      window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
      document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) frame();
      });
      resize();
      frame();
    }
  }

  /* ------------------------------- Form ---------------------------------- */
  const form   = document.getElementById('capture');
  const input  = document.getElementById('email');
  const helper = document.getElementById('helper');
  const submit = document.getElementById('submit');

  // Endpoint opcional: poné acá tu URL (Formspree, Beehiiv, etc.) y los emails
  // se envían de verdad. Si queda vacío, guarda local y muestra éxito igual.
  const ENDPOINT = ''; // ej: 'https://formspree.io/f/xxxxxx'

  const valid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function setHelper(msg, kind) {
    if (!helper) return;
    helper.textContent = msg;
    helper.classList.remove('ok', 'err');
    if (kind) helper.classList.add(kind);
  }

  if (form && input) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!valid(email)) {
        setHelper('Mmm, revisá el email y probá de nuevo.', 'err');
        input.focus();
        return;
      }

      submit.disabled = true;
      const label = submit.querySelector('.btn-label');
      const prev = label ? label.textContent : '';
      if (label) label.textContent = 'Listo';

      try {
        if (ENDPOINT) {
          await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ email }),
          });
        }
        // backup local siempre (no perdemos el lead aunque falle la red)
        try {
          const list = JSON.parse(localStorage.getItem('wafi_waitlist') || '[]');
          if (!list.includes(email)) list.push(email);
          localStorage.setItem('wafi_waitlist', JSON.stringify(list));
        } catch (_) {}

        form.querySelector('.field').style.display = 'none';
        setHelper('Listo. Te avisamos apenas abramos.', 'ok');
        if (!reduce) burst();
      } catch (_) {
        submit.disabled = false;
        if (label) label.textContent = prev;
        setHelper('Algo falló. Probá de nuevo en un momento.', 'err');
      }
    });

    input.addEventListener('input', () => {
      if (helper && helper.classList.contains('err')) {
        setHelper('Te avisamos apenas abramos. Cero spam.');
      }
    });
  }
})();
