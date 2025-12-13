import React from "react";
import { FiGithub } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function WorkCard({ project }) {
  const {
    title,
    description,
    year,
    tags = [],
    href,
    gradient,
    image,
    mockups,
    github,
    live,
  } = project;

  const styleVars = {
    "--g1": gradient?.[0] || "#b35bff",
    "--g2": gradient?.[1] || "#5227ff",
    "--g3": gradient?.[2] || "#050816",
  };

  const images = mockups?.length ? mockups : image ? [image] : [];
  const TAG_ICON_MAP = {
    React: "https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000",
    "Next.js": "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
    Tailwind: "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000",
    Prisma: "/icons/prisma.svg",
    GSAP: "/icons/gsap3.png",
    UI: "/icons/ui.svg",
    "Motion.dev": "https://raw.githubusercontent.com/pheralb/svgl/main/static/library/motion_dark.svg",
    NeonDB: "https://neon.com/brand/neon-logomark-light-color.svg",
  };

  const CTAs = (github || live) && (
    <div className="work2-actions">
      {github && (
        <a
          className="work2-action work2-action--ghost work2-action-github"
          href={github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <FiGithub />
        </a>
      )}
      {live && (
        <a
          className="work2-action work2-action--solid work2-action-live"
          href={live}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Check it out
          <span aria-hidden className="work2-actionArrow">
            <MdOutlineArrowOutward />
          </span>
        </a>
      )}
    </div>
  );

  const CardInner = (
    <>
      <div className="work2-thumb work2-thumb--showcase" style={styleVars}>
        <div className="work2-thumbGlow" />
        <div className="work2-thumbNoise" />

        <div className="work2-showcase">
          {images.slice(0, 2).map((src, idx) => (
            <img
              key={src}
              className={`work2-mockup work2-mockup--${idx}`}
              src={src}
              alt={title}
              loading="lazy"
            />
          ))}
        </div>

        <div className="work2-thumbTopText">
          <span>{description}</span>
          <span className="work2-arrow" aria-hidden>
            <MdArrowOutward />
          </span>
        </div>
      </div>

      <div className="work2-meta">
        <div className="work2-row">
          <h3 className="work2-cardTitle">{title}</h3>
          {year ? <span className="work2-year">{year}</span> : null}
        </div>
{!!tags.length && (
  <div className="work2-tags">
    {tags.map((t) => {
      const label = typeof t === "string" ? t : t.label;
      const icon =
        typeof t === "string" ? TAG_ICON_MAP[label] : t.icon;

      return (
        <span className="work2-tag" key={label}>
          {icon ? (
            <img
              className="work2-tagIcon"
              src={icon}
              alt=""
              aria-hidden="true"
            />
          ) : null}
          <span className="work2-tagText">{label}</span>
        </span>
      );
    })}
  </div>
)}


        {CTAs}
      </div>
    </>
  );

  return href ? (
    <a className="work2-card" href={href}>
      {CardInner}
    </a>
  ) : (
    <div className="work2-card">{CardInner}</div>
  );
}
