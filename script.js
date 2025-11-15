/* ===========================================================
   UNIVERSAL UTILITIES
=========================================================== */

const raf = fn => requestAnimationFrame(fn);

document.addEventListener("DOMContentLoaded", () => {

    const $ = sel => document.querySelector(sel);
    const $$ = sel => Array.from(document.querySelectorAll(sel));

    /* ===========================================================
       1. Fade-in Body (ALL pages)
    ============================================================ */
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");

        // Particles only if #particles exists
        if ($("#particles")) startParticles();

        // Fade-up only if .fade-up elements exist
        if ($$(".fade-up").length) initFadeUp();
    });

    /* ===========================================================
       2. Electric Nav Hover (ALL pages)
    ============================================================ */
    $$("nav a").forEach(a => {
        a.addEventListener("mouseenter", () => {
            a.classList.add("electric");
            setTimeout(() => a.classList.remove("electric"), 240);
        });
    });

    /* ===========================================================
       3. Spark Click Effect (ALL pages)
    ============================================================ */
    document.addEventListener("click", e => {
        const s = document.createElement("span");
        s.className = "spark";
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 650);
    });

    /* ===========================================================
       4. Parallax Background (ONLY if video exists)
    ============================================================ */
    (function initParallax() {
        const video = $("#bg-video") || $("#hero-video");
        if (!video) return;

        let tx = 0, ty = 0, dx = 0, dy = 0;

        document.addEventListener("mousemove", e => {
            dx = (e.clientX - innerWidth / 2) / 60;
            dy = (e.clientY - innerHeight / 2) / 60;
        });

        function anim() {
            tx += (dx - tx) * 0.08;
            ty += (dy - ty) * 0.08;
            video.style.transform = `translate(${tx}px, ${ty}px) scale(1.06)`;
            raf(anim);
        }
        anim();
    })();


    /* ===========================================================
       WORKS PAGE ONLY 🚀 (SAFEST POSSIBLE CHECK)
       Runs only if #projectModal exists in the DOM
    ============================================================ */

    const isWorksPage = document.getElementById("projectModal") !== null;

    if (isWorksPage) {

        /* ================= Tilt Cards ================= */
        initTilt();

        /* ================= Lightning Flash ============ */
        $$(".work-card").forEach(card => {
            card.addEventListener("mouseenter", () => {
                card.classList.add("lightning-flash");
                setTimeout(() => card.classList.remove("lightning-flash"), 320);
            });
        });

        /* ================= Modal System =============== */
        const modal = $("#projectModal");
        const modalTitle = $("#modalTitle");
        const modalDesc = $("#modalDesc");
        const modalImg = $("#modalImg");

        const projects = {
            1: {
                title: "Secure UAV Drone System",
                desc: "Hybrid RSA + ECC encrypted drone communication system.",
                img: "project1.jpg",
            },
            2: {
                title: "Curfew E-Pass System",
                desc: "Pass issuing + verification with QR scanning.",
                img: "project2.jpg",
            },
            3: {
                title: "Cyber Security Analysis",
                desc: "Threat analysis & packet inspection using Kali Linux.",
                img: "project3.jpg",
            }
        };

        window.openProject = id => {
            const p = projects[id];
            if (!p || !modal) return;

            modalTitle.textContent = p.title;
            modalDesc.textContent = p.desc;
            modalImg.src = p.img;

            modal.classList.add("open");
            document.body.style.overflow = "hidden";
        };

        window.closeProject = () => {
            if (!modal) return;
            modal.classList.remove("open");
            document.body.style.overflow = "";
        };

        // Close modal when clicking overlay
        modal.addEventListener("click", e => {
            if (e.target === modal) closeProject();
        });

        // Close on Esc key
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && modal.classList.contains("open")) {
                closeProject();
            }
        });
    }

    /* ===========================================================
       FADE-UP SCROLL ANIMATION
    ============================================================ */
    function initFadeUp() {
        const items = $$(".fade-up");
        if (!items.length) return;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) en.target.classList.add("in-view");
            });
        }, { threshold: 0.18 });

        items.forEach(i => obs.observe(i));
    }

    /* ===========================================================
       TILT FUNCTION (WORKS PAGE ONLY)
    ============================================================ */
    function initTilt() {
        const cards = $$(".work-card.tilt");
        if (!cards.length) return;

        cards.forEach(card => {
            function move(e) {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;

                card.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
                card.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
                card.style.setProperty("--x", `${x * 100 + 50}%`);
                card.style.setProperty("--y", `${y * 100 + 50}%`);
            }

            function reset() {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
                card.style.setProperty("--x", "50%");
                card.style.setProperty("--y", "50%");
            }

            card.addEventListener("mousemove", move);
            card.addEventListener("mouseleave", reset);
        });
    }

    /* ===========================================================
       PARTICLE BACKGROUND (ALL pages if element exists)
    ============================================================ */
    function startParticles() {
        const canvas = $("#particles");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        let w = canvas.width = innerWidth;
        let h = canvas.height = innerHeight;

        class P {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.25;
                this.vy = -0.2 - Math.random() * 0.25;
                this.size = 1 + Math.random() * 1.8;
            }
            step(dt) {
                this.x += this.vx * dt;
                this.y += this.vy * dt;
                if (this.y < -20) this.reset();
            }
            draw() {
                ctx.fillStyle = "rgba(0,190,255,0.15)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = [];
        for (let i = 0; i < 25; i++) particles.push(new P());

        let last = performance.now();
        function loop(now) {
            const dt = now - last;
            last = now;
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.step(dt / 16); p.draw(); });
            raf(loop);
        }
        loop(last);

        window.addEventListener("resize", () => {
            w = canvas.width = innerWidth;
            h = canvas.height = innerHeight;
        });
    }

});
