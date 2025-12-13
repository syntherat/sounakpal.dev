import React from "react";
import ExperienceItem from "./ExperienceItem";
import "./ExperienceSection.css";

export default function ExperienceList({ items = [] }) {
  return (
    <div className="exp__grid">
      <div className="exp__list">
        {items.map((it, idx) => (
          <ExperienceItem
            key={`${it.year}-${idx}`}
            {...it}
            isLast={idx === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
