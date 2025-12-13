import React from "react";
import "./ExperienceSection.css";

export default function ExperienceItem({ year, role, company, description, isLast }) {
  return (
    <article className={`expItem ${isLast ? "expItem--last" : ""}`}>
      <div className="expItem__yearWrap">
        <span className="expItem__year">{year}</span>

        <div className="expItem__timeline" aria-hidden="true">
          <span className="expItem__tick" />
        </div>
      </div>

      <div className="expItem__content">
        <h3 className="expItem__role">{role}</h3>
        <p className="expItem__company">{company}</p>
        <p className="expItem__desc">{description}</p>
      </div>
    </article>
  );
}
