import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./GetInTouch.css";

export default function MagneticButton({
  as = "a", // "a" or "button"
  href = "#contact",
  onClick,
  children = "Get In Touch",
  type = "button",
}) {
  const btnRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    let hovering = false;
    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    // natural magnet values
    const strength = 0.35;
    const max = 12;
    const ease = 0.12;

    const icon = el.querySelector(".cta-pill__icon");
    const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      // icon lag feels jelly
      if (icon) {
        icon.style.transform = `translate3d(${currentX * 0.35}px, ${currentY * 0.35}px, 0)`;
      }

      if (
        hovering ||
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onEnter = () => {
      hovering = true;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      if (!hovering) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      targetX = clamp(dx * strength, -max, max);
      targetY = clamp(dy * strength, -max, max);
    };

    const onLeave = () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const Comp = as;

  return (
    <Comp
      ref={btnRef}
      href={as === "a" ? href : undefined}
      type={as === "button" ? type : undefined}
      onClick={(e) => {
        // only prevent jump when it's an anchor and user gave onClick
        if (as === "a" && onClick) e.preventDefault();
        onClick?.(e);
      }}
      className="cta-pill cta-pill--magnetic"
    >
      <span className="cta-pill__text">{children}</span>
      <span className="cta-pill__icon" aria-hidden="true">
        <FiArrowRight />
      </span>
    </Comp>
  );
}
