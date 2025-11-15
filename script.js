/* ===========================================================
   SIMPLE GLOBAL script.js — Safe for all pages (no eval)
   - Works with background video parallax + simple nav glow + spark
   - Runs only when elements exist on the page
   - CSP-friendly, GitHub Pages safe
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Fade-in body on load
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // small helper selectors
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Nav electric hover (safe)
  $$("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => {
      a.classList.add("electric");
      setTimeout(() => a.classList.remove("electric"), 200);
    });
  });

  // Spark click effect (safe)
  document.addEventListener("click", e => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 500);
  });

  // Parallax for video if present
  const video = $("#bg-video") || $("#hero-video");
  if (video) {
    let tx = 0, ty = 0, dx = 0, dy = 0;
    document.addEventListener("mousemove", e => {
      dx = (e.clientX - innerWidth / 2) / 60;
      dy = (e.clientY - innerHeight / 2) / 60;
    });
    function animate() {
      tx += (dx - tx) * 0.08;
      ty += (dy - ty) * 0.08;
      video.style.transform = `translate(${tx}px, ${ty}px) scale(1.04)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Fade-up reveal (safe)
  function initFadeUp() {
    const items = $$(".fade-up");
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add("in-view");
      });
    }, { threshold: 0.18 });
    items.forEach(i => obs.observe(i));
  }
  if ($$(".fade-up").length) initFadeUp();

});
