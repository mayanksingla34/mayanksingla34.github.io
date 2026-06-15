/* =================================================================
   Mayank Singla — Portfolio
   Vanilla JS · no dependencies
   ================================================================= */
(function () {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* ---------- Icons ---------- */
    function renderIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    /* ---------- Brand icons (Lucide dropped brand logos, so inline them) ---------- */
    const BRANDS = {
        linkedin: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
        github: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.26.8-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3",
        instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
        twitter: "M18.24 2.25h3.31l-7.23 8.26L23.34 21.75H16.17l-5.21-6.82L4.99 21.75H1.68l7.73-8.84L.66 2.25h7.34l4.71 6.23 5.53-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12L17.08 19.77z",
        facebook: "M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z",
        skype: "M12.07 18.87c-4.02 0-5.82-1.98-5.82-3.46 0-.77.56-1.3 1.33-1.3 1.72 0 1.27 2.48 4.49 2.48 1.64 0 2.55-.9 2.55-1.81 0-.55-.27-1.16-1.35-1.43l-3.58-.9c-2.88-.72-3.4-2.28-3.4-3.75 0-3.05 2.86-4.2 5.55-4.2 2.47 0 5.39 1.39 5.39 3.23 0 .79-.68 1.25-1.45 1.25-1.47 0-1.2-2.05-4.17-2.05-1.47 0-2.29.66-2.29 1.61s1.15 1.25 2.14 1.48l2.65.59c2.9.65 3.64 2.35 3.64 3.96 0 2.48-1.9 4.5-5.56 4.5zm11.1-7.62a11.5 11.5 0 0 0 .15-1.84C23.32 4.17 18.99 0 13.72 0c-.63 0-1.23.06-1.82.17A6.68 6.68 0 0 0 8.78 0C4.12 0 .35 3.61.35 8.06c0 .63.07 1.24.21 1.82a11.5 11.5 0 0 0-.15 1.85C.42 19.83 4.75 24 10.02 24c.63 0 1.23-.06 1.82-.17.89.4 1.87.63 2.91.63 4.65 0 8.43-3.61 8.43-8.06 0-.63-.08-1.24-.21-1.82z"
    };
    function renderBrands() {
        $$("[data-brand]").forEach((el) => {
            const key = el.getAttribute("data-brand");
            const d = BRANDS[key];
            if (d && !el.firstChild) {
                el.innerHTML =
                    '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="' +
                    d + '"/></svg>';
            }
        });
    }

    /* ---------- Preloader ---------- */
    function initPreloader() {
        const pre = $("#preloader");
        if (!pre) return;
        window.addEventListener("load", () => {
            setTimeout(() => pre.classList.add("is-done"), 450);
        });
        // Safety: never trap the user behind the preloader
        setTimeout(() => pre.classList.add("is-done"), 3500);
    }

    /* ---------- Year ---------- */
    function initYear() {
        const y = $("#year");
        if (y) y.textContent = new Date().getFullYear();
    }

    /* ---------- Role rotator (typing) ---------- */
    function initRotator() {
        const el = $("#roleRotator");
        if (!el) return;
        const roles = [
            "Software Developer",
            "Full-Stack Engineer",
            "Web Developer",
            "Ethical Hacker",
        ];
        if (prefersReduced) { el.textContent = roles[0]; return; }

        let r = 0, c = 0, deleting = false;
        function tick() {
            const word = roles[r];
            c += deleting ? -1 : 1;
            el.textContent = word.slice(0, c);
            let delay = deleting ? 45 : 95;
            if (!deleting && c === word.length) { delay = 1600; deleting = true; }
            else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 360; }
            setTimeout(tick, delay);
        }
        tick();
    }

    /* ---------- Nav: scroll state, mobile, active section ---------- */
    function initNav() {
        const nav = $("#nav");
        const toggle = $("#navToggle");
        const links = $("#navLinks");
        const navLinks = $$(".nav__link");

        const onScroll = () => {
            if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 30);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        if (toggle && links) {
            toggle.addEventListener("click", () => {
                const open = links.classList.toggle("is-open");
                toggle.classList.toggle("is-open", open);
                toggle.setAttribute("aria-expanded", String(open));
            });
        }
        navLinks.forEach((a) => a.addEventListener("click", () => {
            if (links) links.classList.remove("is-open");
            if (toggle) { toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
        }));

        // Active section via IntersectionObserver
        const sections = $$("main section[id]");
        const byId = {};
        navLinks.forEach((a) => { byId[a.getAttribute("href").slice(1)] = a; });
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    navLinks.forEach((l) => l.classList.remove("is-active"));
                    const link = byId[e.target.id];
                    if (link) link.classList.add("is-active");
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach((s) => spy.observe(s));
    }

    /* ---------- Scroll progress + back to top ---------- */
    function initScrollUI() {
        const bar = $("#scrollProgress");
        const top = $("#backToTop");
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
            if (bar) bar.style.width = (scrolled * 100).toFixed(2) + "%";
            if (top) top.classList.toggle("is-visible", h.scrollTop > 600);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---------- Reveal on scroll ---------- */
    function initReveal() {
        const items = $$(".reveal");
        if (prefersReduced || !("IntersectionObserver" in window)) {
            items.forEach((el) => el.classList.add("is-visible"));
            return;
        }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    const el = e.target;
                    // small stagger for siblings
                    const delay = Math.min(i * 60, 240);
                    setTimeout(() => el.classList.add("is-visible"), delay);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        items.forEach((el) => io.observe(el));
    }

    /* ---------- Cursor glow ---------- */
    function initCursor() {
        const glow = $("#cursorGlow");
        if (!glow || isTouch || prefersReduced) return;
        let x = window.innerWidth / 2, y = window.innerHeight / 2;
        let tx = x, ty = y, raf;
        window.addEventListener("mousemove", (e) => {
            tx = e.clientX; ty = e.clientY;
            glow.style.opacity = "1";
            if (!raf) loop();
        });
        document.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });
        function loop() {
            x += (tx - x) * 0.16;
            y += (ty - y) * 0.16;
            glow.style.transform = `translate(${x}px, ${y}px)`;
            if (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) { raf = requestAnimationFrame(loop); }
            else { raf = null; }
        }
    }

    /* ---------- Magnetic buttons ---------- */
    function initMagnetic() {
        if (isTouch || prefersReduced) return;
        $$("[data-magnetic]").forEach((el) => {
            const strength = 0.32;
            el.addEventListener("mousemove", (e) => {
                const r = el.getBoundingClientRect();
                const mx = e.clientX - (r.left + r.width / 2);
                const my = e.clientY - (r.top + r.height / 2);
                el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
            });
            el.addEventListener("mouseleave", () => { el.style.transform = ""; });
        });
    }

    /* ---------- 3D tilt + spotlight ---------- */
    function initTilt() {
        if (isTouch || prefersReduced) return;
        $$("[data-tilt]").forEach((el) => {
            const max = 7;
            el.addEventListener("mousemove", (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                const rx = (py - 0.5) * -2 * max;
                const ry = (px - 0.5) * 2 * max;
                el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
                el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
                el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
            });
            el.addEventListener("mouseleave", () => { el.style.transform = ""; });
        });
    }

    /* ---------- Hero particle constellation ---------- */
    function initParticles() {
        const canvas = $("#heroCanvas");
        if (!canvas || prefersReduced) return;
        const ctx = canvas.getContext("2d");
        let w, h, dpr, particles = [], mouse = { x: -9999, y: -9999 }, raf;

        function size() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth; h = canvas.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const target = Math.min(90, Math.floor((w * h) / 14000));
            particles = [];
            for (let i = 0; i < target; i++) {
                particles.push({
                    x: pseudoRand(i * 1.7) * w,
                    y: pseudoRand(i * 3.3 + 1) * h,
                    vx: (pseudoRand(i * 5.1 + 2) - 0.5) * 0.4,
                    vy: (pseudoRand(i * 7.9 + 3) - 0.5) * 0.4,
                    r: pseudoRand(i * 2.2 + 4) * 1.6 + 0.6,
                });
            }
        }
        // deterministic pseudo-random (Math.random fine here, but keep it stable-ish)
        function pseudoRand(n) { const s = Math.sin(n) * 10000; return s - Math.floor(s); }

        const LINK = 130;
        function frame() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // mouse repel
                const dxm = p.x - mouse.x, dym = p.y - mouse.y;
                const dm = Math.hypot(dxm, dym);
                if (dm < 120) {
                    p.x += (dxm / dm) * (120 - dm) * 0.02;
                    p.y += (dym / dm) * (120 - dm) * 0.02;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(212, 175, 55, 0.65)";
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const d = Math.hypot(dx, dy);
                    if (d < LINK) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - d / LINK) * 0.18})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(frame);
        }

        size();
        frame();
        window.addEventListener("resize", debounce(size, 200));
        canvas.addEventListener("mousemove", (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
        });
        canvas.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

        // Pause when hero off-screen
        const hero = $("#home");
        if (hero && "IntersectionObserver" in window) {
            new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) { if (!raf) frame(); }
                    else { cancelAnimationFrame(raf); raf = null; }
                });
            }, { threshold: 0 }).observe(hero);
        }
    }

    function debounce(fn, ms) {
        let t;
        return function () { clearTimeout(t); t = setTimeout(fn, ms); };
    }

    /* ---------- Init ---------- */
    function init() {
        renderIcons();
        renderBrands();
        initPreloader();
        initYear();
        initRotator();
        initNav();
        initScrollUI();
        initReveal();
        initCursor();
        initMagnetic();
        initTilt();
        initParticles();
        // icons load async via defer; re-render once available
        window.addEventListener("load", renderIcons);
        setTimeout(renderIcons, 600);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
