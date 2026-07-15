import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import type { IncludedItem } from "./data/types";
import { usePdpData } from "./PdpDataProvider";
import { Reveal, settle } from "./pdp-ui";

const LINE_IMAGES = [
  "/pdp/patient-after.png",
  "/pdp/icons/photo-pharmacy.png",
  "/pdp/icons/photo-howto.png",
  "/pdp/icons/photo-protocol.png",
  "/pdp/icons/photo-packaging.png",
  "/pdp/icons/photo-care.png",
] as const;

function withPeriod(phrase: string) {
  const trimmed = phrase.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function IncludedLine({
  phrase,
  index,
  image,
}: {
  phrase: string;
  index: number;
  image: string;
}) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(lineRef, {
    once: false,
    amount: 0.65,
    margin: "-12% 0px -12% 0px",
  });
  const reduceMotion = useReducedMotion();
  const fromTop = index % 2 === 0;
  const hiddenY = fromTop ? -56 : 56;
  const side = index % 2 === 0 ? "right" : "left";
  const [hovered, setHovered] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showShot = hovered || (coarsePointer && inView);
  const display = withPeriod(phrase);

  return (
    <motion.p
      ref={lineRef}
      className={`pdp-included-line${inView ? " is-active" : ""}${fromTop ? " from-top" : " from-bottom"}${
        showShot ? " is-shot" : ""
      }`}
      initial={false}
      animate={
        reduceMotion
          ? { opacity: inView ? 1 : 0.2, y: 0, color: inView ? "#171310" : "rgba(23, 19, 16, 0.16)" }
          : {
              opacity: inView ? 1 : 0.14,
              y: inView ? 0 : hiddenY,
              x: inView ? 8 : 0,
              color: inView ? "#171310" : "rgba(23, 19, 16, 0.16)",
            }
      }
      transition={{ duration: 0.6, ease: settle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      <span className="pdp-included-line-text">{display}</span>

      <AnimatePresence>
        {showShot ? (
          <motion.span
            key={`shot-${index}`}
            className={`pdp-inc-hover-shot pdp-inc-hover-shot--${side}`}
            aria-hidden="true"
            initial={
              reduceMotion
                ? { opacity: 0, x: "-50%", y: "-50%" }
                : {
                    opacity: 0,
                    scale: 0.78,
                    x: "-50%",
                    y: "calc(-50% + 36px)",
                    rotate: side === "right" ? -9 : 9,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
              rotate: side === "right" ? 5 : -5,
            }}
            exit={
              reduceMotion
                ? { opacity: 0, x: "-50%", y: "-50%" }
                : {
                    opacity: 0,
                    scale: 0.88,
                    x: "-50%",
                    y: "calc(-50% + 18px)",
                    rotate: side === "right" ? -3 : 3,
                  }
            }
            transition={{ duration: 0.38, ease: settle }}
          >
            <span className="pdp-inc-hover-shot-inner">
              <img src={image} alt="" loading="lazy" draggable={false} />
            </span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.p>
  );
}

function IncludedMobileCard({
  item,
  index,
  penImage,
}: {
  item: IncludedItem;
  index: number;
  penImage: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`pdp-incm-card${item.accent ? " is-accent" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease: settle }}
    >
      <span className="pdp-incm-rail-dot" aria-hidden="true" />
      <div className="pdp-incm-top">
        <span className="pdp-incm-num">{item.num}</span>
        <h3 className="pdp-incm-title">{item.title}</h3>
      </div>
      <p className="pdp-incm-detail">{item.detail}</p>
      {item.accent ? (
        <div className="pdp-incm-pen" aria-hidden="true">
          <img src={penImage} alt="" loading="lazy" />
        </div>
      ) : null}
    </motion.article>
  );
}

export function PdpIncludedSection() {
  const { includedPhrases, includedItems, penImage } = usePdpData();

  return (
    <section className="pdp-included-full" id="included" data-pdp-header-theme="light">
      <div className="pdp-included-full-inner">
        <Reveal className="pdp-included-full-head">
          <h2 className="pdp-included-full-title">What&apos;s included</h2>
        </Reveal>

        <div className="pdp-included-full-stage">
          <div className="pdp-included-full-track">
            {includedPhrases.map((phrase, index) => (
              <IncludedLine
                key={phrase}
                phrase={phrase}
                index={index}
                image={LINE_IMAGES[index % LINE_IMAGES.length]}
              />
            ))}
          </div>
        </div>

        <div className="pdp-incm">
          <span className="pdp-incm-rail" aria-hidden="true" />
          {includedItems.map((item, index) => (
            <IncludedMobileCard key={item.id} item={item} index={index} penImage={penImage} />
          ))}
        </div>
      </div>
    </section>
  );
}
