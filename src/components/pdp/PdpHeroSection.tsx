import { useEffect, useState, type MouseEvent } from "react";
import { animated, useTrail } from "@react-spring/web";
import { motion } from "framer-motion";
import { HERO_IMAGES, HERO_STATS, PEN_IMAGE } from "./data/glp1-pdp-data";
import { PdpButton } from "./pdp-ui";

function HeroHeadline({ active }: { active: boolean }) {
  const words = "Lose the weight. Keep it off.".split(" ");
  const trail = useTrail(words.length, {
    from: { opacity: 0, y: 22, blur: 10 },
    to: active ? { opacity: 1, y: 0, blur: 0 } : { opacity: 0, y: 22, blur: 10 },
    config: { mass: 1, tension: 210, friction: 22 },
  });

  return (
    <h1 className="pdp-hero-title">
      {trail.map((style, i) => (
        <animated.span
          key={i}
          className="inline-block will-change-transform"
          style={{
            opacity: style.opacity,
            transform: style.y.to((v) => `translateY(${v}px)`),
            filter: style.blur.to((v) => `blur(${v}px)`),
          }}
        >
          {words[i]}
          {i < words.length - 1 ? "\u00A0" : ""}
        </animated.span>
      ))}
    </h1>
  );
}

type PdpHeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  onStart: (e: MouseEvent) => void;
};

export function PdpHeroSection({ heroRef, onStart }: PdpHeroSectionProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <section className="pdp-hero" id="hero" ref={heroRef}>
      <div className="pdp-hero-glow pdp-hero-glow--a" aria-hidden="true" />
      <div className="pdp-hero-glow pdp-hero-glow--b" aria-hidden="true" />

      <div className="pdp-hero-shell">
        <div className="pdp-hero-inner">
          <div className="pdp-hero-copy">
            <div className="pdp-hero-badges">
              <span className="pdp-pill">GLP-1 Weight Loss</span>
              <span className="pdp-pill pdp-pill--soft">Doctor-prescribed</span>
            </div>

            <HeroHeadline active={active} />

            <p className="pdp-hero-sub">
              Doctor-prescribed GLP-1 in the pre-dosed TIDL Pen. A modern care path from intake to delivery —
              built to feel premium, private, and simple.
            </p>

            <div className="pdp-hero-actions">
              <PdpButton label="Start your intake" onClick={onStart} />
              <a href="#how-pen-works" className="pdp-btn-secondary">
                See how the pen works
              </a>
            </div>

            <div className="pdp-hero-stats">
              {HERO_STATS.map((stat) => (
                <div className="pdp-hero-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pdp-hero-visual">
            <div className="pdp-hero-blade" aria-hidden="true" />

            <motion.div
              className="pdp-hero-card pdp-hero-card--photo"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={HERO_IMAGES.lifestyle} alt="" loading="eager" className="pdp-hero-card-img" />
              <div className="pdp-hero-card-caption">Real care. Real results.</div>
            </motion.div>

            <div className="pdp-hero-pen-stage" aria-hidden="true">
              <div className="pdp-hero-levit">
                <img className="pdp-hero-pen" src={PEN_IMAGE} alt="" />
              </div>
            </div>

            <motion.div
              className="pdp-hero-card pdp-hero-card--mini"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={HERO_IMAGES.packaging} alt="" loading="lazy" className="pdp-hero-card-img" />
              <div className="pdp-hero-card-caption">Discreet delivery</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
