// ============================
// load / fade-in
// ============================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ============================
// nav electric hover
// ============================
document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("mouseenter", () => {
    a.classList.add("electric");
    setTimeout(() => a.classList.remove("electric"), 350);
  });
});

// ============================
// spark click effect
// ============================
document.addEventListener("click", e => {
  const s = document.createElement("span");
  s.className = "spark";
  s.style.left = `${e.clientX}px`;
  s.style.top = `${e.clientY}px`;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 650);
});

// ============================
// parallax for background videos
// applies to ALL videos with ids hero-video or bg-video
// ============================
const parallaxTargets = Array.from(document.querySelectorAll("#hero-video, #bg-video"));

document.addEventListener("mousemove", e => {
  if (!parallaxTargets.length) return;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / 50; // tweak for strength
  const dy = (e.clientY - cy) / 50;
  parallaxTargets.forEach(v => {
    v.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
  });
});

// reset transform when mouse leaves window
document.addEventListener("mouseleave", () => {
  parallaxTargets.forEach(v => v.style.transform = "translate(0px,0px) scale(1)");
});

// ============================
// card interactions: lightning flash & follow-mouse glow
// ============================
document.querySelectorAll(".work-card").forEach(card => {
  // lightning flash: short class toggle
  card.addEventListener("mouseenter", () => {
    card.classList.add("lightning-flash");
    setTimeout(() => card.classList.remove("lightning-flash"), 320);
  });

  // mouse-follow glow (CSS custom properties used)
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  // clear on leave
  card.addEventListener("mouseleave", () => {
    card.style.removeProperty("--x");
    card.style.removeProperty("--y");
  });
});
