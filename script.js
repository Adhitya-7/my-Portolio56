/* ===========================================================
   GLOBAL RESET + BASE (enhanced)
=========================================================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

:root{
  --accent: #00bfff;
  --accent-2: #00d0ff;
  --glass: rgba(255,255,255,0.06);
  --glass-strong: rgba(20,20,20,0.45);
  --neon-shadow: 0 0 18px rgba(0,191,255,0.14), inset 0 0 30px rgba(0,191,255,0.03);
  --max-width: 1100px;
}

html,body{
  height: 100%;
  background: #000;
  font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  color: #fff;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  overflow-x: hidden;
  transition: opacity .45s ease;
  opacity: 0;
}

body.loaded{ opacity: 1; }

/* ===========================================================
   NAVBAR (Floating + Glow)
=========================================================== */
nav{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 120;
  background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));
  backdrop-filter: blur(10px) saturate(120%);
  padding: 0.8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: floatNav 4s ease-in-out infinite alternate;
}

@keyframes floatNav {
  0%   { transform: translateY(0px); }
  100% { transform: translateY(6px); }
}

nav ul{ display:flex; gap: 1.9rem; list-style:none; align-items:center; padding:0 1rem; }

nav a{
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  position: relative;
  transition: color .25s ease, text-shadow .25s ease;
  font-size: 1.05rem;
  letter-spacing: .2px;
}

nav a.active, nav a:hover{
  color: var(--accent);
  text-shadow: 0 0 10px var(--accent);
}

nav a::after{
  content: "";
  position: absolute;
  left: 0; bottom: -6px;
  width: 0; height: 2px;
  background: linear-gradient(90deg,var(--accent),var(--accent-2));
  transition: width .28s ease;
  border-radius:2px;
}

nav a:hover::after, nav a.active::after{ width: 100%; }

/* ===========================================================
   BACKGROUND VIDEO + PARTICLES LAYER
=========================================================== */
#bg-video, #hero-video {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: -20;
  transition: transform .25s ease-out;
  will-change: transform;
}

#particles{
  position: fixed;
  inset: 0;
  z-index: -15;
  pointer-events: none;
  display:block;
}

/* page overlay to dim video */
.page-overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.28);
  z-index: -10;
}

/* ===========================================================
   GLASS CARD (hero)
=========================================================== */
.glass-card{
  max-width: 900px;
  margin: 16vh auto 2rem auto;
  padding: 56px 44px;
  background: var(--glass-strong);
  backdrop-filter: blur(16px) saturate(150%);
  border-radius: 22px;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6), var(--neon-shadow);
  position: relative;
  z-index: 6;
  animation: fadeUp .9s cubic-bezier(.2,.9,.2,1);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.glass-card h1{ font-size: 2.6rem; margin-bottom:.8rem; letter-spacing: .6px; }
.glass-card p{ font-size: 1.12rem; line-height:1.6; color:rgba(255,255,255,0.92); }

/* text shine */
.text-shine{
  background: linear-gradient(90deg, #fff, var(--accent), #fff);
  background-size: 200%;
  -webkit-background-clip: text;
  color: transparent;
  animation: shineMove 3s linear infinite;
}

@keyframes shineMove {
  0% { background-position: 0%; }
  100% { background-position: 200%; }
}

/* ===========================================================
   WORK CARDS GRID & BASE
=========================================================== */
.works-container{
  max-width: var(--max-width);
  margin: 2rem auto 8rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  gap: 2rem;
  padding: 1.5rem;
  position: relative;
  z-index: 6;
}

.work-card{
  background: var(--glass);
  backdrop-filter: blur(14px) saturate(120%);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 30px rgba(0,0,0,0.6);
  transition: transform .45s cubic-bezier(.2,.9,.2,1), box-shadow .35s ease, filter .25s;
  cursor: pointer;
  position: relative;
  transform-origin: center;
  will-change: transform;
  border: 1px solid rgba(255,255,255,0.03);
}

/* NEON OUTLINE (on hover) */
.work-card.neon::after{
  content:"";
  position:absolute; inset:0;
  border-radius:18px;
  pointer-events:none;
  box-shadow: 0 0 30px rgba(0,191,255,0.06);
  transition: box-shadow .28s ease, opacity .28s ease;
  opacity:0;
}

.work-card:hover.neon::after{ opacity:1; box-shadow: 0 0 40px rgba(0,191,255,0.16), 0 0 90px rgba(0,208,255,0.06); }

/* hover micro-interaction */
.work-card:hover{
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 20px 60px rgba(0,0,0,0.65), 0 0 60px rgba(0,191,255,0.06);
  filter: saturate(1.05);
}

/* image */
.work-card img{
  width: 100%;
  height: 220px;
  object-fit: cover;
  display:block;
  transition: transform .6s ease;
}

.work-card:hover img{ transform: scale(1.12); }

/* content */
.work-info{
  padding: 18px 18px 28px 18px;
}

.work-info h2{
  display:flex; align-items:center; gap:.6rem;
  font-size:1.28rem; margin-bottom:.45rem;
  letter-spacing: .2px;
  text-shadow: 0 0 10px rgba(0,191,255,0.12);
  transition: transform .28s ease, color .22s ease;
}

.work-info h2 svg{ transition: transform .28s ease; }

.work-card:hover .work-info h2{ transform: translateX(6px); color:var(--accent-2); }
.work-card:hover .work-info h2 svg{ transform: scale(1.12) translateY(-2px); }

/* meta */
.work-info p{ font-size:1rem; opacity:.95; color: rgba(255,255,255,0.9); line-height:1.45; }

/* small tech chips (modal will use) */
.chips{ display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.7rem; }
.chip{
  background: rgba(255,255,255,0.04);
  color:#fff;
  font-size: .82rem;
  padding:.38rem .6rem;
  border-radius: 999px;
  border:1px solid rgba(255,255,255,0.03);
}

/* ===========================================================
   TILT (3D) — powered by CSS variables; JS writes --rx/--ry
=========================================================== */
.work-card.tilt{
  transform-style: preserve-3d;
  transition: transform .18s ease;
  perspective: 900px;
}

.work-card.tilt .work-info,
.work-card.tilt img{ transform: translateZ(12px); will-change: transform; }

.work-card.tilt{
  /* fallback transform using variables set by JS */
  transform: rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0);
}

/* subtle inner highlight that follows mouse (uses --x --y from JS) */
.work-card::before{
  content:"";
  position:absolute; left:0; top:0; right:0; bottom:0;
  background: radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.03), transparent 15%);
  pointer-events:none;
  transition: background-position .12s linear;
  border-radius: 18px;
}

/* electric lightning flash (quick) */
.lightning-flash{
  animation: cardLightning .32s ease;
}

@keyframes cardLightning {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.9) contrast(1.25); }
  100% { filter: brightness(1); }
}

/* ===========================================================
   FADE-UP (scroll reveal)
=========================================================== */
.fade-up{ opacity:0; transform: translateY(18px); transition: opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1); }
.fade-up.in-view{ opacity:1; transform: translateY(0); }

/* ===========================================================
   MODAL (project preview)
=========================================================== */
.modal{
  position: fixed;
  inset: 0;
  display: none;
  align-items:center;
  justify-content:center;
  z-index:160;
  padding:2rem;
  background: linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.75));
}

.modal.open{ display:flex; }

.modal-content{
  width: min(960px, 96%);
  max-height: 86vh;
  overflow-y: auto;
  background: linear-gradient(180deg, rgba(20,20,20,0.92), rgba(12,12,12,0.98));
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 8px 40px rgba(0,191,255,0.03);
  position: relative;
  border:1px solid rgba(255,255,255,0.04);
}

.modal-content img{ width:100%; height:auto; border-radius:10px; margin-top:.6rem; object-fit:cover; }

.modal .close{
  position:absolute; top:12px; right:14px;
  font-size:1.5rem; color:rgba(255,255,255,0.9); cursor:pointer;
  padding:.3rem .5rem; border-radius:8px; transition: background .18s ease;
}

.modal .close:hover{ background: rgba(255,255,255,0.03); }

/* modal text */
.modal h2{ font-size:1.45rem; margin-bottom:.4rem; }
.modal p{ font-size:1rem; line-height:1.55; color: rgba(255,255,255,0.95); }

/* ===========================================================
   SPARK EFFECT
=========================================================== */
.spark{
  position: fixed;
  width: 12px; height: 12px; border-radius:50%;
  pointer-events: none;
  background: radial-gradient(circle, #fff, var(--accent));
  transform: translate(-50%,-50%);
  animation: spark .6s forwards ease-out;
  z-index: 200;
}

@keyframes spark {
  from { opacity:1; transform:translate(-50%,-50%) scale(1); }
  to   { opacity:0; transform:translate(-50%,-80%) scale(0); }
}

/* ===========================================================
   RESPONSIVE & MOBILE OPTIMIZATIONS
=========================================================== */
@media (max-width: 900px){
  .glass-card{ margin: 12vh 1rem; padding: 36px 22px; }
  .glass-card h1{ font-size: 2rem; }
  .works-container{ gap:1rem; padding: 1rem; }
  .work-card img{ height: 180px; }
  nav ul{ gap:1.1rem; padding:0 0.7rem; }
}

@media (max-width: 520px){
  nav a{ font-size:.95rem; }
  .glass-card{ margin-top: 10vh; padding: 26px 16px; border-radius: 14px; }
  .work-info h2{ font-size: 1.05rem; }
  .work-info p{ font-size: .98rem; }
  .work-card img{ height: 150px; }
  .modal-content{ padding: .8rem; }
}

/* small accessibility focus */
.work-card:focus{ outline: 3px solid rgba(0,191,255,0.12); outline-offset: 4px; }

/* end of file */
