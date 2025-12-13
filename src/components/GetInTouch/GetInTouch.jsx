import React, { useEffect, useState } from "react";
import "./GetInTouch.css";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import MagneticButton from "./MagneticButton";
import ContactDrawer from "./ContactDrawer";

export default function GetInTouch() {
  const [open, setOpen] = useState(false);

  // ESC closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section className="contact" id="get-in-touch">
      <div className="contact__inner">
        {/* Logo */}
        <div className="contact__logo">
          <img src="/logos/SP-white.png" alt="Logo" />
        </div>

        {/* Heading */}
        <h2 className="contact__headline">
          Let’s create something <br />
          <span>great together!</span>
        </h2>

        {/* CTA Button (opens drawer) */}
        <MagneticButton as="button" onClick={() => setOpen(true)}>
          Get In Touch
        </MagneticButton>

        {/* Sub text */}
        <p className="contact__text">
          I'm available for full-time roles & freelance projects.
        </p>
        <p className="contact__subtext">
          I'm always open to discussing new projects, creative
            ideas, or opportunities to be part of your vision.
        </p>

        {/* Socials */}
        <div className="contact__socials">
          <a
            href="https://www.instagram.com/sounak.mp4/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/syntherat"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/sounak-pal/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Drawer */}
      {open && <ContactDrawer open={open} onClose={() => setOpen(false)} />}
    </section>
  );
}
