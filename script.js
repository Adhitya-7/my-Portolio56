// Fade-in Loader
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Page Flash Transition
document.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.includes("http")) return;

  e.preventDefault();
  const flash = document.getElementById("page-flash");
  flash.classList.add("flash-on");
  setTimeout(() => window.location.href = href, 250);
});
