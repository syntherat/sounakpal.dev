import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import { ArrowRight } from 'lucide-react';
import "./Footer.css";

export default function Footer({
  logoSrc = "/logos/SP-white-cropped.png",
  logoAlt = "Logo",
  copyrightName = "Sounak Pal",
  columns = [
    {
      title: "GENERAL",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#work" },
        { label: "Experience", href: "#experience" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Get In Touch", href: "#get-in-touch" },
        { label: "Email Me", href: "mailto:hello@sounakpal.dev", arrow: true },
        { label: "Call Me", href: "tel:+918817728756" },
        // { label: "Attribution", href: "/attribution" },
      ],
    },
    // {
    //   title: "MORE",
    //   links: [
    //     { label: "Book a call", href: "/call", arrow: true },
    //     { label: "Links", href: "/links" },
    //     { label: "RSS", href: "/rss" },
    //   ],
    // },
  ],
  bottomLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
  socials = [
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/your-handle", icon: "github" },
    { label: "Twitter", href: "https://x.com/your-handle", icon: "twitter" },
  ],
}) {
  const year = new Date().getFullYear();

  const renderSocialIcon = (key) => {
    switch (key) {
      case "linkedin":
        return <FaInstagram size={25} />;
      case "github":
        return <FaGithub size={25} />;
      case "twitter":
        return <FaLinkedin size={25} />;
      default:
        return null;
    }
  };

  return (
    <footer className="ft">
      <div className="ft__inner">
        {/* Top row */}
        <div className="ft__top">
          {/* Left: bigger logo ONLY (no text under it) */}
          <a className="ft__brand" href="#home" aria-label="Go to top">
            <img className="ft__logo" src={logoSrc} alt={logoAlt} />
          </a>

          {/* Right: columns */}
          <div className="ft__cols">
            {columns.map((col) => (
              <div className="ft__col" key={col.title}>
                <div className="ft__colTitle">{col.title}</div>
                <ul className="ft__list">
                {col.links.map((l) => (
                    <li key={l.label}>
                    <a className="ft__link" href={l.href}>
                        <span className="ft__linkText">{l.label}</span>

                        {/* ✅ always present, animation handled by CSS */}
                        <span className="ft__arrow" aria-hidden="true">
                        <ArrowRight size={15} />
                        </span>
                    </a>
                    </li>
                ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="ft__bottom">
          <div className="ft__copy">
            © {year} <span>{copyrightName}</span>. All rights reserved
          </div>

          <div className="ft__bottomLinks">
            {bottomLinks.map((l) => (
              <a className="ft__miniLink" key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="ft__socials" aria-label="Social links">
            {socials.map((s) => (
              <a
                key={s.label}
                className="ft__socialBtn"
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
              >
                {renderSocialIcon(s.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
