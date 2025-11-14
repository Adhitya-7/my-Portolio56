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
// PARALLAX (mouse movement)
// ===========================================
document.addEventListener("mousemove", e => {
    const video = document.querySelector("#hero-video, #bg-video");
    if (!video) return;

    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;

    video.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});


// ===========================================
// Gear-5 ⚡ Lightning Hover Effect for Cards
// ===========================================
document.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.classList.add("lightning-flash");
        setTimeout(() => card.classList.remove("lightning-flash"), 300);
    });
});


// ===========================================
// Card glow follows mouse (premium effect)
// ===========================================
document.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });
});
