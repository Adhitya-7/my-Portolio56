// script.js
// Cinematic parallax + gentle camera tilt + spark click + UI niceties
// Drop into your site and include with: <script src="script.js" defer></script>

(() => {
  // --- Config (tweak these to taste) ---
  const CAMERA_ROTATE_STRENGTH = 6;     // how much the page rotates (degrees) on extremes
  const LAYER_TRANSLATE_STRENGTH = 28;  // px multiplier for parallax layers
  const SMOOTHING = 0.12;               // 0..1 smoothing for lerp (lower = smoother)
  const SPARK_LIFETIME = 650;           // ms

  // --- Helpers ---
  const lerp = (a, b, n) => a + (b - a) * n;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // --- State ---
  let winW = innerWidth, winH = innerHeight;
  let targetX = 0, targetY = 0;     // normalized -0.5 .. +0.5
  let currentX = 0, currentY = 0;
  let rafId = null;

  // Cache nodes
  const body = document.body;
  const parallaxLayers = Array.from(document.querySelectorAll('.parallax-layer'));
  const navLinks = Array.from(document.querySelectorAll('nav a'));

  // Add page loaded class (fade-in handled by CSS)
  window.addEventListener('load', () => {
    body.classList.add('loaded');
  });

  // --- NAV electric hover (visual pulse) ---
  navLinks.forEach(a => {
    a.addEventListener('mouseenter', () => {
      a.classList.add('electric');
      setTimeout(() => a.classList.remove('electric'), 300);
    });
  });

  // --- Mouse / touch input handlers ---
  function onPointerMove(clientX, clientY) {
    // convert to -0.5 .. +0.5
    targetX = (clientX / winW) - 0.5;
    targetY = (clientY / winH) - 0.5;
  }

  window.addEventListener('mousemove', (e) => {
    onPointerMove(e.clientX, e.clientY);
    // create subtle spark on rapid clicks handled separately
  });

  // Touch fallback — use first touch
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, {passive:true});

  // Update window size on resize
  window.addEventListener('resize', () => {
    winW = innerWidth;
    winH = innerHeight;
  });

  // --- spark click effect (visual only) ---
  document.addEventListener('click', (e) => {
    const spark = document.createElement('span');
    spark.className = 'spark';
    // position at point clicked
    spark.style.left = `${e.clientX}px`;
    spark.style.top = `${e.clientY}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), SPARK_LIFETIME);
  });

  // --- Main animation loop: smooth lerp + apply transforms ---
  function tick() {
    // smooth lerp toward target
    currentX = lerp(currentX, targetX, SMOOTHING);
    currentY = lerp(currentY, targetY, SMOOTHING);

    // Calculate camera tilt
    // rotateY from left/right (use currentX), rotateX from up/down (-currentY)
    const rotateY = clamp(-currentX * CAMERA_ROTATE_STRENGTH, -CAMERA_ROTATE_STRENGTH, CAMERA_ROTATE_STRENGTH);
    const rotateX = clamp(currentY * CAMERA_ROTATE_STRENGTH, -CAMERA_ROTATE_STRENGTH, CAMERA_ROTATE_STRENGTH);

    // Apply a subtle 3D tilt to the whole body (keeps nav & glass in place but gives cinematic feel)
    // We transform the root element; CSS must allow transforms (it will).
    body.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move each parallax layer at different speeds using data-speed attribute (defaults)
    parallaxLayers.forEach(layer => {
      const rawSpeed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
      // layer translation = normalized pointer * strength * rawSpeed
      const tx = -currentX * LAYER_TRANSLATE_STRENGTH * rawSpeed;
      const ty = -currentY * LAYER_TRANSLATE_STRENGTH * rawSpeed * 0.7; // less vertical motion
      // small scale to add cinematic feel (0.98 - 1.02)
      const scale = 1 + Math.abs(rawSpeed) * 0.01;
      layer.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale})`;
    });

    rafId = requestAnimationFrame(tick);
  }

  // Start RAF
  rafId = requestAnimationFrame(tick);

  // --- Accessibility & clean up ---
  // Allow keyboard to reset pointer (center)
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      targetX = 0; targetY = 0;
    }
  });

  // If the user disables JS transforms or leaves, reset transforms
  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
    body.style.transform = '';
    parallaxLayers.forEach(l => l.style.transform = '');
  });

  // --- Optional: small idle drift when mouse not moved for a while ---
  let idleTimer = null;
  let idleX = 0, idleY = 0;
  function startIdleDrift() {
    if (idleTimer) clearInterval(idleTimer);
    idleTimer = setInterval(() => {
      idleX = (Math.random() - 0.5) * 0.02;
      idleY = (Math.random() - 0.5) * 0.02;
      // subtly nudge target
      targetX += idleX * 0.12;
      targetY += idleY * 0.12;
    }, 2200);
  }
  function stopIdleDrift() {
    if (idleTimer) { clearInterval(idleTimer); idleTimer = null; }
  }
  // restart idle drift when mouse leaves
  document.addEventListener('mouseleave', () => { startIdleDrift(); });
  document.addEventListener('mouseenter', () => { stopIdleDrift(); });

  // start initial tiny idle drift
  startIdleDrift();

})();
