import React from "react";
import "./WorkSection.css";
import WorkGrid from "./WorkGrid";

export default function WorkSection({
  projects = [],
  onViewAll,
  viewAllHref = "/projects",
}) {
  return (
    <section className="work2-section" id="work">
      <div className="work2-wrap">
        <header className="work2-header">
          <p className="work2-kicker">Featured Case Studies</p>
          <h2 className="work2-title">Curated <span>Work</span></h2>
        </header>

        <WorkGrid projects={projects} />

<div className="work2-cta">
  {onViewAll ? (
    <button className="work2-more" onClick={onViewAll} type="button">
      <span className="work2-moreText">See more projects</span>
      <span className="work2-moreCircle" aria-hidden>
        →
      </span>
    </button>
  ) : (
    <a className="work2-more" href={viewAllHref}>
      <span className="work2-moreText">See more projects</span>
      <span className="work2-moreCircle" aria-hidden>
        →
      </span>
    </a>
  )}
</div>

      </div>
    </section>
  );
}
