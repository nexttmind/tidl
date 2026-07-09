import { createFileRoute } from "@tanstack/react-router";
import ProductPdpPage from "@/components/pdp/ProductPdpPage";
import { PDP_META } from "@/components/pdp/data/pdp-data-registry";

export const Route = createFileRoute("/products/longevity-peptides")({
  head: () => ({
    meta: [
      { title: PDP_META["longevity-peptides"].title },
      { name: "description", content: PDP_META["longevity-peptides"].description },
      { property: "og:title", content: PDP_META["longevity-peptides"].title },
      { property: "og:description", content: PDP_META["longevity-peptides"].description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ProductPdpPage slug="longevity-peptides" />,
});
