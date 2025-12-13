import React from "react";
import "./ExperienceSection.css";
import ExperienceList from "./ExperienceList";

export default function ExperienceSection({
  id = "experience",
  kicker = "THE EXPERIENCE",
  heading = (
    <>
      Experience That <br />
      Brings <span className="exp__accent">Ideas to Life</span>
    </>
  ),
  items = [
    {
      year: "2025",
      role: "Frontend Developer",
      company: "Eras Tech",
      description: "Interned as a Frontend Dev for their Laravel Team and redesigned their company website.",
    },
    {
      year: "2023",
      role: "Full-Stack Dev Freelancer",
      company: "Self-Employed",
      description: "Freelancing while building responsive web applications with modern tech stack",
    },
  ],
}) {
  return (
    <section className="exp" id={id}>
      <div className="exp__inner">
        <header className="exp__header">
          <p className="exp__kicker">{kicker}</p>
          <h2 className="exp__headline">{heading}</h2>
        </header>

        <ExperienceList items={items} />
      </div>
    </section>
  );
}
