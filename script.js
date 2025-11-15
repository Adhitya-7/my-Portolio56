/* ===========================================================
   script.js — Upgraded for tilt, particles, fade-up, modal, perf
=========================================================== */

/* —————— Utilities & Safe DOM helpers —————— */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const raf = window.requestAnimationFrame.bind(window);

/* —————— Page loaded fade-in —————— */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  initFadeUpObserver();
  startParticles();
});

/* —————— Electric nav hover flash —————— */
$$("nav a").forEach(a => {
  a.addEventListener("mouseenter", () => {
    a.classList.add("electric");
    setTimeout(() => a.classList.remove("electric"), 240);
  });
});

/* —————— Spark click effect —————— */
document.addEventListener("click", e => {
  const s = document.createElement("span");
  s.className = "spark";
  s.style.left = `${e.clientX}px`;
  s.style.top = `${e.clientY}px`;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 650);
});

/* —————— Parallax (mouse movement) —————— */
(function initParallax() {
  const video = $("#bg-video") || $("#hero-video");
  if (!video) return;
  let lastX = 0, lastY = 0, lx = 0, ly = 0;
  document.addEventListener("mousemove", e => {
    const x = (e.clientX - window.innerWidth / 2) / 60;
    const y = (e.clientY - window.innerHeight / 2) / 60;
    lastX = x; lastY = y;
  });
  function tick() {
    lx += (lastX - lx) * 0.08;
    ly += (lastY - ly) * 0.08;
    video.style.transform = `translate(${lx}px, ${ly}px) scale(1.06)`;
    raf(tick);
  }
  raf(tick);
})();

/* —————— Fade-up scroll reveal —————— */
function initFadeUpObserver(){
  const items = $$(".fade-up");
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("in-view");
    });
  }, { threshold: 0.18 });
  items.forEach(i => obs.observe(i));
}

/* —————— Tilt effect (mouse tracking) —————— */
(function initTilt(){
  const tiltables = $$(".work-card.tilt");
  if (!tiltables.length) return;

  tiltables.forEach(card => {
    const bounds = () => card.getBoundingClientRect();

    function onMove(e){
      const r = bounds();
      const mouseX = (e.clientX ?? (e.touches && e.touches[0].clientX)) - r.left;
      const mouseY = (e.clientY ?? (e.touches && e.touches[0].clientY)) - r.top;
      const px = (mouseX / r.width) - 0.5; // -0.5 .. 0.5
      const py = (mouseY / r.height) - 0.5;

      // rotate values
      const ry = (px * 16).toFixed(2); // rotateY
      const rx = (-py * 10).toFixed(2); // rotateX

      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      // inner spotlight position
      card.style.setProperty("--x", `${(px + 0.5) * 100}%`);
      card.style.setProperty("--y", `${(py + 0.5) * 100}%`);
    }

    function reset(){
      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.style.setProperty("--x", `50%`);
      card.style.setProperty("--y", `50%`);
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("touchmove", onMove, {passive:true});
    card.addEventListener("mouseleave", reset);
    card.addEventListener("touchend", reset);
  });
})();

/* —————— Lightning hover flash for cards —————— */
$$(".work-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("lightning-flash");
    setTimeout(() => card.classList.remove("lightning-flash"), 320);
  });
  // allow keyboard activation
  card.addEventListener("keydown", (e) => {
    if(e.key === "Enter") card.click();
  });
});

/* —————— Project Modal — simple data-driven preview —————— */
const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalImg = $("#modalImg");

const projects = {
  1: {
    title: "Secure UAV Drone System",
    desc: "A hybrid RSA + ECC encrypted drone communication system to ensure secure telemetry and control. Includes link-layer encryption and replay protection.",
    img: "project1.jpg"
  },
  2: {
    title: "Curfew E-Pass System",
    desc: "Pass issuance and verification web system built with HTML, CSS & JS. Features role-based access and QR-based verification flows.",
    img: "project2.jpg"
  },
  3: {
    title: "Cyber Security Analysis",
    desc: "Packet sniffing, threat analysis and vulnerability testing using Kali tooling. Includes sample reports and remediation suggestions.",
    img: "project3.jpg"
  }
};

window.openProject = function (id){
  const p = projects[id];
  if (!p) return;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalImg.src = p.img;
  modalImg.alt = p.title;
  modal.classList.add("open");
  // trap focus for accessibility
  document.body.style.overflow = "hidden";
};

window.closeProject = function (){
  modal.classList.remove("open");
  document.body.style.overflow = "";
};

/* close modal when clicked outside content or Esc pressed */
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeProject();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeProject();
});

/* —————— Simple lazy image replacement for perf —————— */
$$(".work-card img").forEach(img => {
  img.loading = "lazy";
});

/* —————— PARTICLES BACKGROUND — lightweight canvas —————— */
function startParticles(){
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  let particles = [];
  const PARTICLE_COUNT = Math.max(18, Math.floor((w * h) / 90000)); // scale with screen

  class P {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -0.1 - Math.random() * 0.35;
      this.size = 0.6 + Math.random() * 2.2;
      this.alpha = 0.06 + Math.random() * 0.14;
      this.t = Math.random() * Math.PI * 2;
    }
    step(dt){
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.t += 0.01;
      if (this.y < -20 || this.x < -40 || this.x > w + 40) this.reset();
    }
    draw(ctx){
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,191,255,${this.alpha})`;
      ctx.ellipse(this.x, this.y, this.size, this.size * 0.6, 0, 0, Math.PI*2);
      ctx.fill();
    }
  }

  for (let i=0;i<PARTICLE_COUNT;i++) particles.push(new P());

  let last = performance.now();
  function loop(now){
    const dt = Math.min(60, now - last);
    last = now;
    ctx.clearRect(0,0,w,h);
    for (let p of particles){
      p.step(dt/16);
      p.draw(ctx);
    }
    raf(loop);
  }
  raf(loop);

  /* handle resize */
  let rtid;
  window.addEventListener("resize", () => {
    clearTimeout(rtid);
    rtid = setTimeout(() => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      // adjust particle count slightly
      const desired = Math.max(12, Math.floor((w * h) / 90000));
      while (particles.length < desired) particles.push(new P());
      while (particles.length > desired) particles.pop();
    }, 180);
  });
}

/* —————— Accessibility: allow keyboard navigation on cards —————— */
$$(".work-card").forEach(card => {
  card.tabIndex = 0;
});

/* —————— End of file —————— */
