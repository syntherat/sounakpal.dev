// pages/HomePage.jsx
import Hero from '../components/Hero/Hero';
import SkillsShowcase from '../components/SkillsShowcase/SkillsShowcase';

export default function HomePage({ onHeroMenuVisibilityChange }) {
  return (
    <>
    <Hero onHeroMenuVisibilityChange={onHeroMenuVisibilityChange} />
    <SkillsShowcase />
    </>

  );
}
