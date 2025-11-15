/* ===========================================================
   script.js — FINAL PATCHED VERSION
   Safe modal init, safe event listeners, tilt, particles,
   fade-up animations, spark, parallax — all optimized.
=========================================================== */

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const raf = fn => requestAnimationFrame(fn);


/* ===========================================================
   PAGE LOAD FADE
=========================================================== */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  initFadeUp();
  startParticles();
});


/* ===========================================================
   NAV ELECTRIC FLASH
=========================================================== */
$$("nav a").forEach(a => {
  a.addEventListener("mouseenter", () => {
    a.classList.add("electric");
    setTimeout(() => a.classList.remove("electric"), 240);
  });
});


/* ===========================================================
   SPARK CLICK EFFECT
=========================================================== */
document.addEventListener("click", e => {
  const s = document.createElement("span");
  s.className = "spark";
  s.style.left = `${e.clientX}px`;
  s.style.top = `${e.clientY}px`;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 650);
});


/* ===========================================================
   PARALLAX VIDEO
=========================================================== */
(function initParallax() {
  const video = $("#bg-video") || $("#hero-video");
  if (!video) return;

  let tx = 0, ty = 0, dx = 0, dy = 0;

  document.addEventListener("mousemove", e => {
    dx = (e.clientX - innerWidth / 2) / 60;
    dy = (e.clientY - innerHeight / 2) / 60;
  });

  function anim() {
    tx += (dx - tx) * 0.08;
    ty += (dy - ty) * 0.08;

    video.style.transform = `translate(${tx}px, ${ty}px) scale(1.06)`;
    raf(anim);
  }
  anim();
})();


/* ===========================================================
   SCROLL FADE-UP ANIMATIONS
=========================================================== */
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


/* ===========================================================
   TILT CARDS
=========================================================== */
(function initTilt() {
  const cards = $$(".work-card.tilt");
  if (!cards.length) return;

  cards.forEach(card => {
    const getRect = () => card.getBoundingClientRect();

    function move(e) {
      const rect = getRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const ry = (x * 16).toFixed(2);
      const rx = (-y * 10).toFixed(2);

      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--x", `${x * 100 + 50}%`);
      card.style.setProperty("--y", `${y * 100 + 50}%`);
    }

    function reset() {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--x", "50%");
      card.style.setProperty("--y", "50%");
    }

    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", reset);
  });
})();


/* ===========================================================
   LIGHTNING FLASH
=========================================================== */
$$(".work-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("lightning-flash");
    setTimeout(() => card.classList.remove("lightning-flash"), 320);
  });
});


/* ===========================================================
   MODAL SYSTEM (SAFE PATCHED)
=========================================================== */

let modal, modalTitle, modalDesc, modalImg;

document.addEventListener("DOMContentLoaded", () => {
  modal = $("#projectModal");
  modalTitle = $("#modalTitle");
  modalDesc = $("#modalDesc");
  modalImg = $("#modalImg");

  // If modal doesn't exist (shouldn't happen), skip safely
  if (!modal) return;

  // Close when clicking outside content
  modal.addEventListener("click", e => {
    if (e.target === modal) closeProject();
  });

  // Close on Esc
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeProject();
    }
  });
});


// PROJECT DATA
const projects = {
  1: {
    title: "Secure UAV Drone System",
    desc: "A hybrid RSA + ECC encrypted drone communication system ensuring secure telemetry and control.",
    img: "project1.jpg"
  },
  2: {
    title: "Curfew E-Pass System",
    desc: "A complete pass-issuing and verification system with role-based access and QR validation.",
    img: "project2.jpg"
  },
  3: {
    title: "Cyber Security Analysis",
    desc: "Deep packet inspection, vulnerability assessment, and security auditing using Kali Linux.",
    img: "project3.jpg"
  }
};


// OPEN MODAL
window.openProject = id => {
  if (!modal) return;

  const p = projects[id];
  if (!p) return;

  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalImg.src = p.img;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

// CLOSE MODAL
window.closeProject = () => {
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
};


/* ===========================================================
   PARTICLE BACKGROUND
=========================================================== */
function startParticles() {
  const canvas = $("#particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  const particles = [];
  const COUNT = Math.max(18, Math.floor((w * h) / 90000));

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -0.1 - Math.random() * 0.35;
      this.size = 0.6 + Math.random() * 2.2;
      this.alpha = 0.08 + Math.random() * 0.12;
    }

    step(dt) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      if (this.y < -20 || this.x < -40 || this.x > w + 40) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,191,255,${this.alpha})`;
      ctx.ellipse(this.x, this.y, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  let last = performance.now();

  function loop(now) {
    const dt = Math.min(60, now - last);
    last = now;

    ctx.clearRect(0, 0, w, h);

    for (let p of particles) {
      p.step(dt / 16);
      p.draw();
    }

    raf(loop);
  }

  loop(last);

  // Resize handling
  window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });
}

