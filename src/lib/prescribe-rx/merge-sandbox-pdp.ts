import type { PdpPageContent } from "@/components/pdp/data/types";
import type { LiveProduct } from "@/lib/prescribe-rx/use-live-catalog";
import { formatCurrency } from "@/lib/pricing";

function money(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return formatCurrency(n);
}

/**
 * Overlay every sandbox catalog field onto the static PDP shell so the page
 * shows the live PrescribeRx product (name, SKU, pricing, class/type ids, etc.).
 */
export function mergeSandboxIntoPdp(
  base: PdpPageContent,
  live: LiveProduct | undefined,
): PdpPageContent {
  if (!live) return base;

  const box = live.handBox;
  const summary =
    live.description?.trim() ||
    live.shortDescription?.trim() ||
    `${live.name}. ${box.clinicalLabel}.`;

  const specs = [
    { label: "Sandbox name", detail: live.name },
    { label: "SKU", detail: live.sku ?? "—" },
    { label: "Product id", detail: live.id ?? "—" },
    { label: "Short description", detail: live.shortDescription ?? "—" },
    {
      label: "Long description",
      detail: live.description?.trim() ? live.description : "Not set in sandbox",
    },
    { label: "Product type id", detail: live.productTypeId ?? "—" },
    { label: "Product class id", detail: live.productClassId ?? "—" },
    { label: "Product class (label)", detail: box.productClass },
    { label: "Product type (label)", detail: box.productType },
    { label: "Strength", detail: box.strength },
    { label: "Concentration", detail: box.concentration },
    { label: "Volume", detail: box.volume },
    { label: "Form", detail: box.formLabel },
    { label: "RX required", detail: live.rxRequired == null ? "—" : live.rxRequired ? "Yes" : "No" },
    { label: "Active", detail: live.isActive == null ? "—" : live.isActive ? "Yes" : "No" },
    { label: "Consumer price", detail: money(live.consumerPrice) },
    { label: "Retail price", detail: money(live.retailPrice) },
    { label: "Wholesale price", detail: money(live.wholesalePrice) },
    { label: "Price type", detail: live.priceType ?? "—" },
    { label: "Display price", detail: money(live.price) },
    { label: "How to use", detail: box.administration },
    { label: "Storage", detail: box.storage },
    { label: "Label", detail: box.clinicalLabel },
  ];

  const usePeptideImage = base.productForm !== "pen";
  const image = usePeptideImage ? live.image : base.heroImage;

  return {
    ...base,
    heroImage: image,
    penImage: usePeptideImage ? live.image : base.penImage,
    marketing: base.marketing
      ? {
          ...base.marketing,
          beforeAfter: [
            {
              image: live.beforeImage,
              beforeLabel: "Week 0",
              afterLabel: "Week 12",
              caption: `${live.name} — sandbox catalog product.`,
              weeks: "12-week journey",
            },
            {
              image: live.afterImage,
              beforeLabel: "Week 0",
              afterLabel: "Week 16",
              caption: "Pharmacy label from PrescribeRx sandbox.",
              weeks: "16-week journey",
            },
          ],
        }
      : base.marketing,
    heroProduct: {
      ...base.heroProduct,
      name: live.name,
      descriptor: `${box.productClass} · SKU ${live.sku ?? "—"}`,
      summary,
      startingPrice: live.price ?? base.heroProduct.startingPrice,
      priceNote: `Sandbox pricing · consumer ${money(live.consumerPrice)} · retail ${money(live.retailPrice)}`,
      specs,
      trustNote: `${box.clinicalLabel}. Individual results vary.`,
      perks: [
        {
          label: "Sandbox SKU",
          detail: live.sku ?? "Pending catalog SKU",
        },
        {
          label: live.rxRequired ? "Rx flag on" : "Rx flag off",
          detail: live.rxRequired
            ? "Sandbox marks this product as RX required"
            : "Sandbox rx_required is false — provider still reviews peptide intake",
        },
        {
          label: live.isActive ? "Active in catalog" : "Inactive in catalog",
          detail: `Product class ${live.productClassId ?? "—"}`,
        },
      ],
    },
    includedPhrases: box.boxContents,
    includedItems: [
      {
        id: "sandbox-name",
        num: "01",
        title: live.name,
        detail: `SKU ${live.sku ?? "—"} · ${box.formLabel} · ${box.strength}`,
        callsign: "SKU",
        shortLabel: "Product",
        accent: true,
      },
      {
        id: "sandbox-price",
        num: "02",
        title: `From ${money(live.price)}`,
        detail: `Consumer ${money(live.consumerPrice)} · Retail ${money(live.retailPrice)} · Wholesale ${money(live.wholesalePrice)} (${live.priceType ?? "n/a"})`,
        callsign: "PRICE",
        shortLabel: "Price",
      },
      {
        id: "sandbox-label",
        num: "03",
        title: box.clinicalLabel,
        detail: `${box.administration} ${box.storage}`,
        callsign: "LABEL",
        shortLabel: "Label",
      },
      {
        id: "sandbox-ids",
        num: "04",
        title: "Catalog identifiers",
        detail: `id ${live.id ?? "—"} · type ${live.productTypeId ?? "—"} · class ${live.productClassId ?? "—"}`,
        callsign: "IDS",
        shortLabel: "IDs",
      },
      {
        id: "sandbox-ship",
        num: "05",
        title: "What's in the shipment",
        detail: box.boxContents.join(" · "),
        callsign: "BOX",
        shortLabel: "Box",
      },
    ],
  };
}
