import { motion, useReducedMotion } from "framer-motion";
import type { CategorySlug } from "@/lib/categories";

type Props = {
  slug: CategorySlug;
};

const ease = [0.22, 1, 0.36, 1] as const;

function Picture({ src, alt = "" }: { src: string; alt?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      className="cat-experience-picture"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </motion.figure>
  );
}

export function CategoryExperienceSection({ slug }: Props) {
  if (slug === "weight-loss") {
    return (
      <section className="cat-experience cat-experience--weight" data-site-header-theme="dark">
        <div className="cat-experience-weight-copy">
          <p>You&apos;re done</p>
          <h2>Restarting Monday.<br />Hiding in photos.<br />Letting food run the room.</h2>
          <span>This time, the plan meets you where you are.</span>
        </div>
        <div className="cat-experience-weight-grid">
          <Picture src="/category/weight-loss/life-1.png" />
          <Picture src="/category/weight-loss/life-2.png" />
          <Picture src="/category/weight-loss/life-3.png" />
        </div>
      </section>
    );
  }

  if (slug === "metabolic-health") {
    return (
      <section className="cat-experience cat-experience--metabolic" data-site-header-theme="light">
        <header>
          <p>Your whole day should not depend on one good hour.</p>
          <h2>Steady feels different.</h2>
        </header>
        <div className="cat-experience-day">
          <div><Picture src="/category/metabolic-health/morning.png" /><span>Clear mornings</span></div>
          <div><Picture src="/category/metabolic-health/midday.png" /><span>No 3PM crash</span></div>
          <div><Picture src="/category/metabolic-health/evening.png" /><span>Energy left for life</span></div>
        </div>
      </section>
    );
  }

  if (slug === "testosterone") {
    return (
      <section className="cat-experience cat-experience--testosterone" data-site-header-theme="dark">
        <div className="cat-experience-testosterone-statement">
          <p>This is not “just getting older.”</p>
          <h2>The fog.<br />The flat mornings.<br />The missing drive.</h2>
          <span>Start with symptoms. Confirm with labs. Build around you.</span>
        </div>
        <div className="cat-experience-testosterone-stack">
          <Picture src="/category/testosterone/you-1.png" />
          <Picture src="/category/testosterone/you-2.png" />
          <Picture src="/category/testosterone/you-3.png" />
        </div>
      </section>
    );
  }

  if (slug === "longevity") {
    return (
      <section className="cat-experience cat-experience--longevity" data-site-header-theme="light">
        <div className="cat-experience-longevity-title">
          <p>More life in your years</p>
          <h2>Not younger.<br />More alive.</h2>
        </div>
        <div className="cat-experience-longevity-rail">
          <Picture src="/category/longevity/mood-1.png" />
          <Picture src="/category/longevity/mood-2.png" />
          <Picture src="/category/longevity/mood-3.png" />
        </div>
      </section>
    );
  }

  if (slug === "performance") {
    return (
      <section className="cat-experience cat-experience--performance" data-site-header-theme="dark">
        <header>
          <p>Work. Recover. Repeat.</p>
          <h2>Your protocol should keep pace.</h2>
        </header>
        <div className="cat-experience-ritual">
          <div><span>01</span><Picture src="/category/performance/ritual-1.png" /></div>
          <div><span>02</span><Picture src="/category/performance/ritual-2.png" /></div>
          <div><span>03</span><Picture src="/category/performance/ritual-3.png" /></div>
        </div>
      </section>
    );
  }

  return (
    <section className="cat-experience cat-experience--recovery" data-site-header-theme="light">
      <div className="cat-experience-recovery-copy">
        <p>When recovery stalls, everything does.</p>
        <h2>Repair is part of the work.</h2>
      </div>
      <div className="cat-experience-recovery-flow">
        <div><Picture src="/category/recovery/sleep.png" /><span>Sleep</span></div>
        <div><Picture src="/category/recovery/repair.png" /><span>Repair</span></div>
        <div><Picture src="/category/recovery/stretch.png" /><span>Return</span></div>
      </div>
    </section>
  );
}
