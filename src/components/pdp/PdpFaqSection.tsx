import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PDP_FAQ_ITEMS } from "./data/glp1-pdp-data";
import { Reveal } from "./pdp-ui";

function FaqChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PdpFaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="pdp-faq" id="faq">
      <div className="pdp-faq-inner">
        <div className="pdp-faq-layout">
          <Reveal className="pdp-faq-intro">
            <h2 className="pdp-faq-title">Frequently asked questions</h2>
            <Link to="/" hash="faq" className="pdp-faq-all-btn">
              View all FAQs
            </Link>
          </Reveal>

          <div className="pdp-faq-list">
            {PDP_FAQ_ITEMS.map((item) => (
              <div key={item.id} className={`pdp-faq-item${openId === item.id ? " open" : ""}`}>
                <button
                  type="button"
                  className="pdp-faq-q"
                  aria-expanded={openId === item.id}
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span className="pdp-faq-qt">{item.q}</span>
                  <span className="pdp-faq-ic">
                    <FaqChevron />
                  </span>
                </button>
                <div className="pdp-faq-a">
                  <div className="pdp-faq-aw">
                    <p className="pdp-faq-at">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
