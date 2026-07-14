import { usePdpData } from "./PdpDataProvider";
import { Reveal } from "./pdp-ui";
import { useLiveProduct } from "@/lib/prescribe-rx/use-live-catalog";
import { formatCurrency } from "@/lib/pricing";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="pdp-sandbox-row">
      <dt>{label}</dt>
      <dd>{value || "—"}</dd>
    </div>
  );
}

function money(n: number | null | undefined) {
  if (n == null) return "—";
  return formatCurrency(n);
}

/** Every field returned by the PrescribeRx sandbox catalog for this peptide. */
export function PdpSandboxFactsSection() {
  const { slug } = usePdpData();
  const live = useLiveProduct(slug);
  if (!live) return null;

  return (
    <section className="pdp-section pdp-sandbox-facts" id="sandbox-facts" data-pdp-header-theme="light">
      <div className="pdp-section-shell">
        <div className="pdp-section-inner">
          <Reveal>
            <span className="pdp-kicker">PrescribeRx sandbox</span>
            <h2 className="pdp-section-title">Everything this product has in the catalog</h2>
            <p className="pdp-section-lead">
              Live fields from the TIDL Sandbox catalog for{" "}
              <strong>{live.name}</strong>
              {live.fromSandbox ? "" : " (cached local match — refresh to reconnect)"}
              .
            </p>
          </Reveal>

          <Reveal className="pdp-sandbox-panel" delay={0.08}>
            <dl className="pdp-sandbox-grid">
              <Row label="Name" value={live.name} />
              <Row label="SKU" value={live.sku ?? "—"} />
              <Row label="Product ID" value={live.id ?? "—"} />
              <Row label="Short description" value={live.shortDescription ?? "—"} />
              <Row
                label="Description"
                value={live.description?.trim() ? live.description : "Not set in sandbox"}
              />
              <Row label="Product type ID" value={live.productTypeId ?? "—"} />
              <Row label="Product class ID" value={live.productClassId ?? "—"} />
              <Row
                label="RX required"
                value={live.rxRequired == null ? "—" : live.rxRequired ? "Yes" : "No"}
              />
              <Row
                label="Active"
                value={live.isActive == null ? "—" : live.isActive ? "Yes" : "No"}
              />
              <Row label="Consumer price" value={money(live.consumerPrice)} />
              <Row label="Retail price" value={money(live.retailPrice)} />
              <Row label="Wholesale price" value={money(live.wholesalePrice)} />
              <Row label="Price type" value={live.priceType ?? "—"} />
              <Row label="Display price" value={money(live.price)} />
              <Row label="Parsed strength" value={live.handBox.strength} />
              <Row label="Parsed concentration" value={live.handBox.concentration} />
              <Row label="Parsed volume" value={live.handBox.volume} />
              <Row label="Parsed form" value={live.handBox.formLabel} />
              <Row label="Class label" value={live.handBox.productClass} />
              <Row label="Type label" value={live.handBox.productType} />
              <Row
                label="Variant SKUs in sandbox"
                value={
                  live.variants.length > 0
                    ? `${live.variants.length} matched`
                    : "—"
                }
              />
            </dl>
          </Reveal>

          {live.variants.length > 1 ? (
            <Reveal className="pdp-sandbox-panel" delay={0.12}>
              <h3 className="pdp-sandbox-variants-title">Related sandbox SKUs</h3>
              <ul className="pdp-sandbox-variants">
                {live.variants.map((variant) => (
                  <li key={variant.id}>
                    <strong>{variant.name}</strong>
                    <span>
                      {variant.formHint}
                      {variant.sku ? ` · ${variant.sku}` : ""}
                      {variant.price != null ? ` · ${money(variant.price)}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
