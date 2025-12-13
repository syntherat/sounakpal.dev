import { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroSpline from "../IntroSpline/IntroSpline";
import HeroText from "./HeroText/HeroText";
import HeroSpline from "../HeroSpline/HeroSpline";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onHeroMenuVisibilityChange }) {
  const heroRef = useRef(null);
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const nameRef = useRef(null);
  const bgRef = useRef(null);

  // adaptive particles (less on mobile)
  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 24;
    const w = window.innerWidth;
    if (w <= 480) return 14;
    if (w <= 768) return 18;
    if (w <= 1024) return 26;
    return 40;
  }, []);

  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    const name = nameRef.current;
    const bg = bgRef.current;

    if (!heroEl || !wrapper || !overlay || !name || !bg) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
      typeof window !== "undefined" ? window.innerWidth <= 768 : false;

    const ctx = gsap.context(() => {
      // Make sure trigger calculations are correct (important when using pin)
      ScrollTrigger.refresh();

      // initial states
      gsap.set(wrapper, { opacity: 1, y: 0, force3D: true });
      gsap.set(bg, { opacity: 1, force3D: true });
      gsap.set(overlay, { opacity: 0, force3D: true });
      gsap.set(name, {
        opacity: 0,
        y: 120,
        backgroundSize: "0% 100%",
        textShadow: "0 0 0 rgba(111,63,240,0)",
        force3D: true,
      });

      const particles = gsap.utils.toArray(".particle", heroEl);

      particles.forEach((p) => {
        gsap.set(p, {
          x: gsap.utils.random(-260, 260),
          y: gsap.utils.random(-130, 130),
          scale: gsap.utils.random(0.6, 1.15),
          opacity: 0,
          force3D: true,
          willChange: "transform, opacity",
        });
      });

      const tl = gsap.timeline();

      // fade out base hero, show overlay
      tl.to([wrapper, bg], { opacity: 0, duration: 0.45, ease: "none" }, 0);
      tl.to(overlay, { opacity: 1, duration: 0.22, ease: "none" }, 0);

      // name in
      tl.to(
        name,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.08
      );

      // particles (only on desktop + not reduced motion)
      if (!isMobile && !reduceMotion) {
        tl.fromTo(
          particles,
          { opacity: 0, y: 22, scale: 0.7 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            stagger: { each: 0.02, from: "center" },
          },
          0.10
        );

        tl.to(name, { backgroundSize: "100% 100%", duration: 0.5, ease: "none" }, 0.22);

        tl.to(particles, { y: "-=26", duration: 0.45, ease: "none" }, 0.28);

        tl.to(
          particles,
          {
            opacity: 0,
            y: "-=90",
            scale: 0.65,
            duration: 0.35,
            ease: "power2.in",
            stagger: { each: 0.008, from: "edges" },
          },
          0.62
        );
      } else {
        // mobile: just do the name highlight
        tl.to(name, { backgroundSize: "100% 100%", duration: 0.45, ease: "none" }, 0.22);
      }

      // exit
      tl.to(
        name,
        { opacity: 0, y: -90, duration: 0.28, ease: "power2.in" },
        0.78
      );
      tl.to(overlay, { opacity: 0, duration: 0.22, ease: "none" }, 0.86);

      const st = ScrollTrigger.create({
        animation: tl,
        trigger: heroEl,
        start: "top top",
        end: "+=200%",
        scrub: 0.6, // smoother + less jitter than scrub:true
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,

        onLeave: () => onHeroMenuVisibilityChange?.(true),
        onEnterBack: () => onHeroMenuVisibilityChange?.(false),
      });

      return () => {
        st.kill();
        tl.kill();
      };
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
            {Array.from({ length: particleCount }).map((_, i) => (
              <span key={i} className="particle" />
            ))}
          </div>

          <h1 ref={nameRef} className="hero-name">
            SOUNAK
          </h1>
        </div>
      </section>

      <section className="below-content">
        <div className="about-wrapper">
          <h2>About Me</h2>
          <div className="about-wrapper-main">
            <div className="about-left-wrapper">
              <p className="purple-accent">Full-Stack Developer</p>
              <p className="sounak">Hey, I'm Sounak!</p>
              <p className="about">
                I'm a full-stack developer crafting scalable web experiences.
                Currently building robust applications with{" "}
                <span className="purple-accent">modern tech stacks.</span>
              </p>
              <div className="buttons">
                <button>EXPLORE WORK</button>
                <button>GET IN TOUCH</button>
              </div>
              <p className="companies-header">Companies I've Worked With</p>
              <div className="companies">
                <p>Rxpress</p>
                <p>ErasTech</p>
                <p>ErasTech</p>
              </div>
            </div>

            <div className="about-right-wrapper">
              <IntroSpline />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
