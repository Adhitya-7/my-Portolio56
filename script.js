// Fade-in on page load
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// -------------------------------------------------------
// Electric hover for navbar
// -------------------------------------------------------
document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => {
        a.classList.add("electric");
        setTimeout(() => a.classList.remove("electric"), 250);
    });
});

// -------------------------------------------------------
// Spark click effect
// -------------------------------------------------------
document.addEventListener("click", e => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
});

// -------------------------------------------------------
// Smooth parallax (very soft, no camera shaking)
// -------------------------------------------------------
document.addEventListener("mousemove", (e) => {
    const video = document.querySelector("#hero-video, #bg-video");
    if (!video) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 6;  
    const y = (e.clientY / window.innerHeight - 0.5) * 6;

    video.style.transform = `translate(${x}px, ${y}px) scale(1.03)`; 
});

// Reset when mouse leaves window
document.addEventListener("mouseleave", () => {
    const video = document.querySelector("#hero-video, #bg-video");
    if (!video) return;
    video.style.transform = `translate(0px, 0px) scale(1)`;
});
