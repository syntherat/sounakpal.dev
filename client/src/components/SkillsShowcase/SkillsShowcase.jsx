import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillTooltipIcon from "../ui/SkillTooltipIcon";
import "./SkillsShowcase.css";

gsap.registerPlugin(ScrollTrigger);

// you can swap these out for real, different skills
const row1Skills = [
  {
    name: "Java",
    icon: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
  },
  {
    name: "C",
    icon: "https://img.icons8.com/?size=100&id=40670&format=png&color=000000",
  },
  {
    name: "C++",
    icon: "https://img.icons8.com/?size=100&id=40669&format=png&color=000000",
  },
  {
    name: "Python",
    icon: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000",
  },
  {
    name: "React",
    icon: "https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000",
  },
  {
    name: "JavaScript",
    icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
  },
  {
    name: "TypeScript",
    icon: "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000",
  },
  {
    name: "Node",
    icon: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000",
  },
  { name: "Express", icon: "/icons/icons8-express-js.svg" },
  {
    name: "Markdown",
    icon: "https://img.icons8.com/?size=100&id=21813&format=png&color=F0E500",
  },
];

const row2Skills = [
  {
    name: "NPM",
    icon: "https://img.icons8.com/?size=100&id=24895&format=png&color=000000",
  },
  {
    name: "MongoDB",
    icon: "https://img.icons8.com/?size=100&id=8rKdRqZFLurS&format=png&color=000000",
  },
  {
    name: "PostgreSQL",
    icon: "https://img.icons8.com/?size=100&id=38561&format=png&color=000000",
  },
  { name: "PassportJS", icon: "/icons/passportjs.png" },
  {
    name: "Motion.dev",
    icon: "https://raw.githubusercontent.com/pheralb/svgl/main/static/library/motion_dark.svg",
  },
  { name: "GSAP", icon: "/icons/gsap3.png" },
  { name: "AWS", icon: "/icons/icons8-aws.svg" },
  {
    name: "Tailwind CSS",
    icon: "https://img.icons8.com/?size=100&id=4PiNHtUJVbLs&format=png&color=000000",
  },
  {
    name: "Bootstrap",
    icon: "https://img.icons8.com/?size=100&id=PndQWK6M1Hjo&format=png&color=000000",
  },
  {
    name: "HTML5",
    icon: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  },
];

// exactly 6 items on the 3rd row
const row3Skills = [
  {
    name: "CSS",
    icon: "https://img.icons8.com/?size=100&id=21278&format=png&color=000000",
  },
  {
    name: "Git",
    icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
  },
  { name: "GitHub", icon: "/icons/icons8-github.svg" },
  { name: "Hetzner", icon: "/icons/hetzner.png" },
  {
    name: "Ubuntu",
    icon: "https://img.icons8.com/?size=100&id=jboFV8ZOXgZR&format=png&color=000000",
  },
  { name: "Vercel", icon: "/icons/vercel.svg" },
];

const allSkills = [...row1Skills, ...row2Skills, ...row3Skills];

export default function SkillsShowcase() {
  const sectionRef = useRef(null);

  const row1CardsRef = useRef([]);
  const row2CardsRef = useRef([]);
  const row3CardsRef = useRef([]);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const row1 = row1CardsRef.current.filter(Boolean);
    const row2 = row2CardsRef.current.filter(Boolean);
    const row3 = row3CardsRef.current.filter(Boolean);

    if (!row1.length && !row2.length && !row3.length) return;

    const rowsConfig = [
      { cards: row1, flatY: -12 },
      { cards: row2, flatY: 0 },
      { cards: row3, flatY: 14 },
    ];

    const radius = 260;
    const angleRange = 150;

    const setFinalState = () => {
      rowsConfig.forEach(({ cards, flatY }) => {
        gsap.set(cards, { x: 0, y: flatY, rotation: 0, opacity: 1, scale: 1 });
      });
    };

    const setCurvedInitial = () => {
      rowsConfig.forEach(({ cards, flatY }) => {
        cards.forEach((card, i) => {
          const t = cards.length > 1 ? i / (cards.length - 1) : 0;
          const angle = gsap.utils.mapRange(0, 1, -angleRange / 2, angleRange / 2)(t);
          const rad = (angle * Math.PI) / 180;

          const x = Math.sin(rad) * radius;
          const curveY = Math.cos(rad) * 50;

          gsap.set(card, {
            x,
            y: flatY + curveY,
            rotation: angle * 2,
            opacity: 0.6,
            scale: 0.95,
          });
        });
      });
    };

    const mm = gsap.matchMedia();

    // ✅ Desktop only: curved -> straight + pinned scroll animation
    mm.add("(min-width: 1025px)", () => {
      setCurvedInitial();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=750",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      rowsConfig.forEach(({ cards, flatY }) => {
        tl.to(
          cards,
          {
            x: 0,
            y: flatY,
            rotation: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            duration: 1,
          },
          0
        );
      });

      // cleanup when leaving desktop breakpoint
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    // ✅ Tablet/phone: no ScrollTrigger at all, just final state
mm.add("(max-width: 1024px)", () => {
  rowsConfig.forEach(({ cards }) => {
    gsap.set(cards, { clearProps: "transform" });
    gsap.set(cards, { opacity: 1 });
  });
  ScrollTrigger.getAll().forEach((st) => st.kill());
  return () => {};
});
    return () => mm.revert();
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section className="skills-section" ref={sectionRef}>
      <div className="skills-inner">
        <p className="skills-eyebrow">MY SKILLS</p>
        <h2 className="skills-title">
          The Secret <span>Sauce</span>
        </h2>

<div className="skills-rows">
  {/* DESKTOP/TABLET (3 rows) */}
  <div className="skills-rows-desktop">
    <div className="skills-row">
      {row1Skills.map((skill, i) => (
        <div
          key={`row1-${skill.name}-${i}`}
          className="skill-card"
          ref={(el) => (row1CardsRef.current[i] = el)}
        >
          <div className="skill-card-inner">
            <SkillTooltipIcon icon={skill.icon} label={skill.name} />
          </div>
        </div>
      ))}
    </div>

    <div className="skills-row">
      {row2Skills.map((skill, i) => (
        <div
          key={`row2-${skill.name}-${i}`}
          className="skill-card"
          ref={(el) => (row2CardsRef.current[i] = el)}
        >
          <div className="skill-card-inner">
            <SkillTooltipIcon icon={skill.icon} label={skill.name} />
          </div>
        </div>
      ))}
    </div>

    <div className="skills-row">
      {row3Skills.map((skill, i) => (
        <div
          key={`row3-${skill.name}-${i}`}
          className="skill-card"
          ref={(el) => (row3CardsRef.current[i] = el)}
        >
          <div className="skill-card-inner">
            <SkillTooltipIcon icon={skill.icon} label={skill.name} />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* MOBILE (one flexbox grid) */}
  <div className="skills-grid-mobile">
    {allSkills.map((skill, i) => (
      <div key={`all-${skill.name}-${i}`} className="skill-card">
        <div className="skill-card-inner">
          <SkillTooltipIcon icon={skill.icon} label={skill.name} />
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </section>
  );
}
