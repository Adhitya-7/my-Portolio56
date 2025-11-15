// Fade-in animation on load
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Electric hover effect on navbar
document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => {
        a.classList.add("electric");
        setTimeout(() => a.classList.remove("electric"), 250);
    });
});

// Click spark effect
document.addEventListener("click", (e) => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
});

// Parallax cursor movement
document.addEventListener("mousemove", (e) => {
    const video = document.getElementById("hero-video");
    if (!video) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    video.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
