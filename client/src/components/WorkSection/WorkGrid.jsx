import React from "react";
import WorkCard from "./WorkCard";

export default function WorkGrid({ projects = [] }) {
  return (
    <div className="work2-grid">
      {projects.map((p) => (
        <WorkCard key={p.id || p.title} project={p} />
      ))}
    </div>
  );
}
