import peptideImageMap from "./peptide-image-map.json";

export type PeptideImageEntry = {
  image: string;
  catalogId: string;
  catalogName: string;
  source: string;
};

/** Facts printed on / implied by the pharmacy “hand box” label in the sandbox catalog. */
export type PeptideHandBox = {
  catalogName: string;
  productClass: string;
  productType: string;
  strength: string;
  concentration: string;
  volume: string;
  formLabel: string;
  clinicalLabel: string;
  rxNote: string;
  administration: string;
  storage: string;
  boxContents: readonly string[];
};

const MAP = peptideImageMap as Record<string, PeptideImageEntry>;

const PRODUCT_TYPE: Record<string, string> = {
  "glp-1-weight-loss": "Tirzepatide",
  retatrutide: "Retatrutide",
  "bpc-157": "BPC-157",
  "tb-500": "TB-500",
  wolverine: "BPC-157 / TB-500",
  "cjc-1295-ipamorelin": "CJC-1295 / Ipamorelin",
  tesamorelin: "Tesamorelin",
  "mots-c": "MOTS-C",
  "nad-plus": "NAD+",
  "ghk-cu": "GHK-Cu",
  sermorelin: "Sermorelin",
};

function parseStrength(name: string): string {
  const m =
    name.match(/(\d+(?:\.\d+)?\s*mg(?:\s*\/\s*\d+(?:\.\d+)?\s*mg)?)/i) ??
    name.match(/(\d+(?:\.\d+)?\s*mg)/i);
  return m?.[1]?.replace(/\s+/g, "") ?? "Provider-set";
}

function parseConcentration(name: string): string {
  const m = name.match(/(\d+(?:\.\d+)?\s*mg\s*\/\s*ml)/i);
  if (m) return m[1].replace(/\s+/g, "").toLowerCase().replace("mg/ml", "mg/mL");
  const m2 = name.match(/\((\d+(?:\.\d+)?mg\/ml[^)]*)\)/i);
  if (m2) return m2[1];
  return "As labeled";
}

function parseVolume(name: string): string {
  const m = name.match(/(\d+(?:\.\d+)?\s*ml)/i);
  return m?.[1]?.replace(/\s+/g, "").toLowerCase().replace("ml", "mL") ?? "As labeled";
}

function parseForm(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("pen")) return "Multi-dose pen";
  if (lower.includes("nasal")) return "Nasal spray";
  if (lower.includes("odt") || lower.includes("tablet")) return "Oral dissolvable tablet";
  return "Multi-dose vial";
}

/** Bump when regenerating public/peptides assets so browsers drop stale PNGs. */
const PEPTIDE_ASSET_VERSION = "studio-v1";

function withAssetVersion(path: string): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}v=${PEPTIDE_ASSET_VERSION}`;
}

/** Transparent PNG path for a featured product (from sandbox catalog, bg removed). */
export function getPeptideImage(slug: string): string | undefined {
  const image = MAP[slug]?.image;
  return image ? withAssetVersion(image) : undefined;
}

/** Full map of featured slug → cleaned local peptide images. */
export function getPeptideImageMap(): Record<string, PeptideImageEntry> {
  return MAP;
}

/**
 * Resolve a product image that is always a peptide catalog vial/pen shot —
 * never lifestyle or stock photography. Falls back to another featured peptide
 * image if the slug has no entry.
 */
export function resolvePeptideOnlyImage(slug: string): string {
  const direct = MAP[slug]?.image;
  if (direct) return withAssetVersion(direct);
  const first = Object.values(MAP)[0]?.image;
  if (first) return withAssetVersion(first);
  return withAssetVersion("/peptides/bpc-157.png");
}

/**
 * Build “hand box” product facts from the matched sandbox catalog label.
 * Matches PrescribeRx product structure: class, type, volume, form, clinical use.
 */
export function getPeptideHandBox(slug: string): PeptideHandBox {
  const entry = MAP[slug];
  const catalogName = entry?.catalogName ?? PRODUCT_TYPE[slug] ?? slug;
  const formLabel = parseForm(catalogName);
  const isGlp = slug === "glp-1-weight-loss" || slug === "retatrutide";

  return {
    catalogName,
    productClass: isGlp ? "GLP-1s & GIPs" : "Peptides (Clinical Use Only)",
    productType: PRODUCT_TYPE[slug] ?? catalogName.split(" ")[0] ?? slug,
    strength: parseStrength(catalogName),
    concentration: parseConcentration(catalogName),
    volume: parseVolume(catalogName),
    formLabel,
    clinicalLabel: "Prescription only · physician use",
    rxNote: "Prescription required after licensed provider review",
    administration:
      "Every peptide plan includes a TIDL Pen and a clear how to guide. Follow your provider’s dose: prepare, dial, click, inject. Do not change your dose without instructions.",
    storage:
      "Store as labeled on the pharmacy packaging. Cold-chain when required; keep out of direct light.",
    boxContents: [
      "Licensed provider review",
      "Pharmacy grade medication",
      "TIDL Pen + how to guide",
      "Personalized provider protocol and dosing guidance",
      "Discreet outer packaging",
      "Access to your care team for questions",
    ],
  };
}
