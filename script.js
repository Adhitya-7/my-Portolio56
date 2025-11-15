// ============================================================
// FADE IN
// ============================================================
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    spawnParticles(); // start particle system
});

// ============================================================
// NAV ELECTRIC HOVER
// ============================================================
document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => {
        a.classList.add("electric");
        setTimeout(() => a.classList.remove("electric"), 250);
    });
});

// ============================================================
// CLICK SPARK
// ============================================================
document.addEventListener("click", e => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
});

// ============================================================
// CINEMATIC PARALLAX (Super Smooth)
// ============================================================
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

function animateParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    const bg = document.querySelector("#hero-video, #bg-video, .contact-bg");
    const card = document.querySelector(".glass-card");

    if (bg)
        bg.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.03)`;

    if (card)
        card.style.transform = `translate(${currentX/6}px, ${currentY/6}px)`;

    requestAnimationFrame(animateParallax);
}
animateParallax();

document.addEventListener("mousemove", e => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 18;
    targetY = (e.clientY / window.innerHeight - 0.5) * 18;
});

document.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
});

// ============================================================
// FLOATING PARTICLE SYSTEM
// ============================================================
function spawnParticles() {
    setInterval(() => {
        const p = document.createElement("div");
        p.className = "particle";

        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.bottom = "-20px";

        p.style.animationDuration = (4 + Math.random() * 3) + "s";

        document.body.appendChild(p);

        setTimeout(() => p.remove(), 6000);
    }, 250); // particle frequency
}
if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    document.body.classList.add("mobile-off");
}
