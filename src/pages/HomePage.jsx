// pages/HomePage.jsx
import Hero from '../components/Hero/Hero';
import SkillsShowcase from '../components/SkillsShowcase/SkillsShowcase';
import RibbonSeparator from '../components/ui/RibbonSeparator.jsx/RibbonSeparator';
import WorkSection from '../components/WorkSection/WorkSection';
import ExperienceSection from '../components/Experience/ExperienceSection';
import GetInTouch from '../components/GetInTouch/GetInTouch';

const projects = [
  {
    id: "insights",
    title: "Insights Club Web",
    description: "A sleek user-friendly college club journalism webpage.",
    year: "2025",
    gradient: ["#ff2a9d", "#ff5aa5", "#b61cff"], // top -> bottom feel
    mockups: ["/work-images/insights-thumb2.png","/work-images/Insights-thumb1.png"], // stacked
    tags: ["React", "Motion.dev", "Tailwind"],
    href: "/projects/starforge",
    github: "https://github.com/you/ai-saas", 
    live: "https://ai-saas.vercel.app",        
  },
  {
    id: "rxpress",
    title: "Rxpress Logistics Web",
    description: "A simple logistics landing page with live shipment tracking.",
    year: "2025",
    gradient: ["#15d6c5", "#12c9be", "#0aa2ff"],
    image: "/work-images/Rxpress-Thumb.png", // single
    tags: ["React", "Tailwind", "NeonDB"],
    href: "/projects/snips",
    github: "https://github.com/you/ai-saas", 
    live: "https://ai-saas.vercel.app", 
  },
  {
    id: "pahal",
    title: "Pahal Foundation",
    description: "A cute uplifting college charity foundation with custom donations.",
    year: "2025",
    gradient: ["#7e22ce", "#b675f5", "#842ad3ff"],
    image: "/work-images/Pahal-thumb.png", // single
    tags: ["React", "Tailwind"],
    href: "/projects/snips",
    github: "https://github.com/you/ai-saas", 
    live: "https://ai-saas.vercel.app", 
  },
];

export default function HomePage({ onHeroMenuVisibilityChange }) {
  return (
    <>
      <Hero onHeroMenuVisibilityChange={onHeroMenuVisibilityChange} />
      <RibbonSeparator />
      <SkillsShowcase />
      <WorkSection projects={projects} viewAllHref="/projects" />
      <ExperienceSection />
      <GetInTouch />
    </>

  );
}
