import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroText from './HeroText/HeroText';
import HeroSpline from '../HeroSpline/HeroSpline';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onHeroMenuVisibilityChange }) {
  const heroRef = useRef(null);
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const nameRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // initial states
      gsap.set(wrapperRef.current, { opacity: 1, y: 0 });
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(nameRef.current, {
        opacity: 0,
        y: 120,
        backgroundSize: '0% 100%',
        textShadow: '0 0 0 rgba(111,63,240,0)',
      });

      const particles = gsap.utils.toArray('.particle');
      particles.forEach((p) => {
        gsap.set(p, {
          x: gsap.utils.random(-320, 320),
          y: gsap.utils.random(-160, 160),
          scale: gsap.utils.random(0.4, 1.4),
          opacity: 0,
        });
      });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      // your existing animation steps...
      tl.to([wrapperRef.current, bgRef.current], { opacity: 0, duration: 0.5 });
      tl.to(
        overlayRef.current,
        { opacity: 1, duration: 0.3 },
        '<'
      );
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
      tl.fromTo(
        particles,
        { opacity: 0, y: 40, scale: 0.4 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: { each: 0.03, from: 'center' },
          duration: 0.6,
          ease: 'power2.out',
        },
        '<'
      );
      tl.to(nameRef.current, {
        backgroundSize: '100% 100%',
        duration: 0.6,
      });
      tl.to(
        particles,
        { y: '+=-40', duration: 0.6 },
        '<'
      );
      tl.to(
        particles,
        {
          opacity: 0,
          y: '+=-140',
          scale: 0.2,
          stagger: { each: 0.01, from: 'edges' },
          duration: 0.6,
        },
        '<'
      );
      tl.to(nameRef.current, {
        opacity: 0,
        y: -120,
        duration: 0.4,
        ease: 'power2.in',
      });
      tl.to(
        particles,
        {
          opacity: 0,
          y: (i) => -120 - i * 4,
          scale: 0.2,
          stagger: { each: 0.01, from: 'edges' },
          duration: 0.6,
        },
        '<'
      );
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3 });

      ScrollTrigger.create({
        animation: tl,
        trigger: heroRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        anticipatePin: 1, 
        // 👇 WHEN you leave the hero at the bottom → show menu
        onLeave: () => {
          onHeroMenuVisibilityChange?.(true);
        },

        // 👇 WHEN you scroll back up into the hero → hide menu
        onEnterBack: () => {
          onHeroMenuVisibilityChange?.(false);
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [onHeroMenuVisibilityChange]);

  return (
    <>
      <section className="hero" ref={heroRef} id="home">
        <div className="hero-bg" ref={bgRef} />
        <div className="hero-wrapper" ref={wrapperRef}>
          <HeroText />
          <HeroSpline />
        </div>

        <div className="hero-name-overlay" ref={overlayRef}>
          <div className="hero-particles">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="particle" />
            ))}
          </div>
          <h1 ref={nameRef} className="hero-name">
            SOUNAK
          </h1>
        </div>
      </section>

      {/* content below hero */}
      <section className="below-content">
        <div className='about-wrapper'>
          <h2>About Me</h2>
          <div className='about-wrapper-main'>
            <div className='about-left-wrapper'>
              <p className='purple-accent'>
                Full-Stack Developer
              </p>
              <p className='sounak'>Hey, I'm Sounak!</p>
              <p className='about'>
                I'm a full-stack developer crafting scalable
                web experiences. Currently building robust 
                applications with <span className='purple-accent'>modern tech stacks.</span>
                </p>
              <div className='buttons'>
                <button>EXPLORE WORK</button>
                <button>GET IN TOUCH</button>
              </div>
              <p className='companies-header'>Companies I've Worked With</p>
              <div className='companies'>
                <p>Rxpress</p>
                <p>ErasTech</p>
                <p>ErasTech</p>
              </div>
            </div>
            
            <div className='about-right-wrapper'>
              <img src="https://picsum.photos/200" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
