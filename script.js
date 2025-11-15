// Fade-in on load
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
