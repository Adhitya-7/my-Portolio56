(() => {
  const q = s => document.querySelector(s);
  const qa = s => [...document.querySelectorAll(s)];

  /* LOADER */
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    setTimeout(() => {
      const l = q("#loader");
      if (l) l.style.display = "none";
    }, 600);
  });

  /* CLICK SPARKS */
  document.addEventListener("click", e => {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  });

  /* PAGE TRANSITION FLASH */
  const flash = () => {
    const f = q("#page-flash");
    f.classList.add("flash-on");
    setTimeout(() => f.classList.remove("flash-on"), 250);
  };

  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("http")) return;
    e.preventDefault();
    flash();
    setTimeout(() => (window.location.href = href), 250);
  });

  /* PARALLAX VIDEO (mouse move) */
  const vids = qa("#hero-video, #bg-video");
  if (vids.length) {
    document.addEventListener("mousemov
