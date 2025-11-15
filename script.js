document.addEventListener("DOMContentLoaded", () => {

  // Fade in page
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Electric nav hover
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(a => {
    a.addEventListener("mouseenter", () => {
      a.classList.add("electric");
      setTimeout(() => a.classList.remove("electric"), 200);
    });
  });

  // Spark click effect
  document.addEventListener("click", e => {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 500);
  });

  // Parallax video effect
  const video = document.querySelector("#bg-video") || document.querySelector("#hero-video");
  if (video) {
    let tx = 0, ty = 0, dx = 0, dy = 0;

    document.addEventListener("mousemove", e => {
      dx = (e.clientX - window.innerWidth / 2) / 60;
      dy = (e.clientY - window.innerHeight / 2) / 60;
    });

    function animate() {
      tx += (dx - tx) * 0.08;
      ty += (dy - ty) * 0.08;
      video.style.transform = "translate(" + tx + "px, " + ty + "px) scale(1.04)";
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Fade-up
  const fadeItems = document.querySelectorAll(".fade-up");
  if (fadeItems.length > 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, { threshold: 0.25 });

    fadeItems.forEach(el => obs.observe(el));
  }

});
