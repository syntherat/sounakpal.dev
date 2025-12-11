// pages/HomePage.jsx
import Hero from '../components/Hero/Hero';
import SkillsShowcase from '../components/SkillsShowcase/SkillsShowcase';
import RibbonSeparator from '../components/ui/RibbonSeparator.jsx/RibbonSeparator';

export default function HomePage({ onHeroMenuVisibilityChange }) {
  return (
    <>
    <Hero onHeroMenuVisibilityChange={onHeroMenuVisibilityChange} />
    <RibbonSeparator />
    <SkillsShowcase />
    </>

  );
}
