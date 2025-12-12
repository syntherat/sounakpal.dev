// pages/HomePage.jsx
import Hero from '../components/Hero/Hero';
import SkillsShowcase from '../components/SkillsShowcase/SkillsShowcase';
import RibbonSeparator from '../components/ui/RibbonSeparator.jsx/RibbonSeparator';
import WorkSection from '../components/WorkSection/WorkSection';

const projects = [
  {
    id: "starforge",
    title: "AI SaaS Landing",
    description: "A sleek AI SaaS landing page with a user-friendly design.",
    year: "2024",
    gradient: ["#ff2a9d", "#ff5aa5", "#b61cff"], // top -> bottom feel
    mockups: ["/work-images/insights-thumb2.png","/work-images/Insights-thumb1.png"], // stacked
    tags: ["React", "GSAP", "UI"],
    href: "/projects/starforge",
    github: "https://github.com/you/ai-saas", 
    live: "https://ai-saas.vercel.app",        
  },
  {
    id: "snips",
    title: "Code Snippets Platform",
    description: "Create and share code snippets with a clean, intuitive UI.",
    year: "2024",
    gradient: ["#15d6c5", "#12c9be", "#0aa2ff"],
    image: "/work-images/Rxpress-Thumb.png", // single
    tags: ["Next.js", "Tailwind", "Prisma"],
    href: "/projects/snips",
    github: "https://github.com/you/ai-saas", 
    live: "https://ai-saas.vercel.app", 
  },
  {
    id: "snipss",
    title: "Code Snippets Platform",
    description: "Create and share code snippets with a clean, intuitive UI.",
    year: "2024",
    gradient: ["#15d6c5", "#12c9be", "#0aa2ff"],
    image: "/work-images/Pahal-thumb.png", // single
    tags: ["Next.js", "Tailwind", "Prisma"],
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
    </>

  );
}
