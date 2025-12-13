import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Navbar.css";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Navbar({
  visible = true,
  // if you're using an image logo, pass logoSrc instead of logoText
  logoSrc = "/logos/SP-white.png",
  logoAlt = "Logo",
  logoText = "SOUNAK",
  items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
}) {
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const socialsRef = useRef(null);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // navbar enter/exit based on Hero
  useLayoutEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: visible ? 0 : -18,
      opacity: visible ? 1 : 0,
      duration: 0.35,
      ease: "power2.out",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible]);

  // modal animation
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const menu = menuRef.current;
    const socialsEl = socialsRef.current;
    if (!overlay || !menu || !socialsEl) return;

    const links = menu.querySelectorAll("a");
    const icons = socialsEl.querySelectorAll("a");

    if (open) {
      gsap.set(overlay, { display: "block" });

      // start hidden
      gsap.set([links, icons], { opacity: 0, y: 18 });

      // also fade in the close button nicely
      const closeBtn = overlay.querySelector(".navOverlay-close");
      gsap.set(closeBtn, { opacity: 0, scale: 0.95 });

      const tl = gsap.timeline();
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.18, ease: "power1.out" }
      )
        .to(
          closeBtn,
          { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" },
          "<+=0.04"
        )
        .to(
          links,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.07,
          },
          "<+=0.05"
        )
        .to(
          icons,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.06,
          },
          "<+=0.10"
        );

      requestAnimationFrame(() => links[0]?.focus?.());
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.16,
        ease: "power1.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);

  // close when clicking the empty backdrop (not inside)
  const onOverlayPointerDown = (e) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  return (
    <>
      <header className="nav" ref={navRef}>
        <div className="nav-inner">
          <a className="nav-logo" href="#home" aria-label="Go to home">
            {logoSrc ? (
              <img className="nav-logoImg" src={logoSrc} alt={logoAlt} />
            ) : (
              <>
                <span className="nav-logoMark" />
                <span className="nav-logoText">{logoText}</span>
              </>
            )}
          </a>

          <button
            className={`nav-btn ${open ? "is-open" : ""}`}
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            type="button"
          >
            <span className="nav-btnIcon" aria-hidden="true">
              <span className="line l1" />
              <span className="line l2" />
            </span>
            <span className="nav-btnText">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      {/* Minimal fullscreen menu */}
      <div
        className="navOverlay"
        ref={overlayRef}
        onPointerDown={onOverlayPointerDown}
      >
        <button
          className="navOverlay-close"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setOpen(false)}
          type="button"
          aria-label="Close menu"
        >
          <span className="x1" />
          <span className="x2" />
        </button>

        <div className="navOverlay-center">
          <nav
            className="navOverlay-menu"
            ref={menuRef}
            aria-label="Site navigation"
          >
            {items.map((it, idx) => (
              <a
                key={it.label}
                href={it.href}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setOpen(false)}
                className={idx % 2 === 0 ? "is-left" : "is-right"}
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div
            className="navOverlay-socials"
            ref={socialsRef}
            aria-label="Social links"
          >
            <a
              href="https://www.instagram.com/sounak.mp4/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <FaInstagram />
            </a>

            <a
              href="https://github.com/syntherat"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/sounak-pal/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
