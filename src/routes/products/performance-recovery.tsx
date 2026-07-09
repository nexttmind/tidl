import { createFileRoute } from "@tanstack/react-router";
import ProductPdpPage from "@/components/pdp/ProductPdpPage";
import { PDP_META } from "@/components/pdp/data/pdp-data-registry";

export const Route = createFileRoute("/products/performance-recovery")({
  head: () => ({
    meta: [
      { title: PDP_META["performance-recovery"].title },
      { name: "description", content: PDP_META["performance-recovery"].description },
      { property: "og:title", content: PDP_META["performance-recovery"].title },
      { property: "og:description", content: PDP_META["performance-recovery"].description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ProductPdpPage slug="performance-recovery" />,
});
