import { type MouseEvent } from "react";
import { PdpButton, Reveal } from "./pdp-ui";

type PdpCtaBandProps = {
  onStart: (e: MouseEvent) => void;
};

export function PdpCtaBand({ onStart }: PdpCtaBandProps) {
  return (
    <section className="pdp-cta-section" id="get-started" data-pdp-header-theme="light">
      <Reveal>
        <div className="pdp-cta-band">
          <div className="pdp-cta-band-inner">
            <div className="pdp-cta-band-copy">
              <span className="pdp-kicker">Ready when you are</span>
              <h2>Feel like you again. Start today.</h2>
              <p>Five-minute intake · Doctor-reviewed · Discreet delivery to your door.</p>
            </div>
            <PdpButton label="Start your intake" onClick={onStart} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
