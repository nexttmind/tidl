import { usePdpData } from "./PdpDataProvider";

const FALLBACK_LINES = [
  "You're done starting over",
  "You're done hiding in photos",
  "You're done letting the scale win",
] as const;

/**
 * Left-to-right motivational ticker — restored campaign strip.
 * Pain lines + gold "Become you" refrain.
 */
export function PdpMotivationMarquee() {
  const { marketing } = usePdpData();
  const lines = marketing?.painPoints?.length ? marketing.painPoints : FALLBACK_LINES;

  return (
    <div className="pdp-campaign-marquee" aria-hidden="true">
      <div className="pdp-campaign-marquee-track">
        {[0, 1].map((loop) => (
          <span key={loop}>
            {lines.map((item) => (
              <span key={`${loop}-${item}`} className="pdp-campaign-chip">
                {item}
              </span>
            ))}
            <span className="pdp-campaign-chip pdp-campaign-chip--gold">Become you</span>
            <span className="pdp-campaign-chip">Doctor-guided</span>
            <span className="pdp-campaign-chip pdp-campaign-chip--gold">Feel free again</span>
            <span className="pdp-campaign-chip">Discreet delivery</span>
          </span>
        ))}
      </div>
    </div>
  );
}
