// ===========================================
// Fade-in on load
// ===========================================
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// ===========================================
// Electric nav hover glow
// ===========================================
document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => {
        a.classList.add("electric");
        setTimeout(() => a.classList.remove("electric"), 250);
    });
});

// ===========================================
// Spark click effect
// ===========================================
document.addEventListener("click", e => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
});

// ===========================================
// Parallax video movement
// ===========================================
document.addEventListener("mousemove", e => {
    const video = document.querySelector("#bg-video, #hero-video");
    if (!video) return;

    const x = (e.clientX - window.innerWidth / 2) / 60;
    const y = (e.clientY - window.innerHeight / 2) / 60;

    video.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
});

// ===========================================
// Fade-up effect
// ===========================================
const fadeItems = document.querySelectorAll(".fade-up");

const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
}, { threshold: 0.25 });

fadeItems.forEach(el => fadeObs.observe(el));
