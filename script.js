// Fade-in on page load
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Electric nav hover
document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => {
        a.classList.add("electric");
        setTimeout(() => a.classList.remove("electric"), 250);
    });
});

// Spark click effect
document.addEventListener("click", e => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
});

// Cursor Parallax Effect (Video + Glass Card Move)
document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;

    const video = document.querySelector("#hero-video, #bg-video");
    const glass = document.querySelector(".glass-card");

    if (video) video.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    if (glass) glass.style.transform = `translate(${x/4}px, ${y/4}px)`;
});

// Reset parallax on mouse leave
document.addEventListener("mouseleave", () => {
    const video = document.querySelector("#hero-video, #bg-video");
    const glass = document.querySelector(".glass-card");

    if (video) video.style.transform = `translate(0,0) scale(1)`;
    if (glass) glass.style.transform = `translate(0,0)`;
});
