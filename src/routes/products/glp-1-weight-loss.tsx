import { createFileRoute } from "@tanstack/react-router";
import ProductPdpPage from "@/components/pdp/ProductPdpPage";
import { PDP_META } from "@/components/pdp/data/pdp-data-registry";

export const Route = createFileRoute("/products/glp-1-weight-loss")({
  head: () => ({
    meta: [
      { title: PDP_META["glp-1-weight-loss"].title },
      { name: "description", content: PDP_META["glp-1-weight-loss"].description },
      { property: "og:title", content: PDP_META["glp-1-weight-loss"].title },
      { property: "og:description", content: PDP_META["glp-1-weight-loss"].description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ProductPdpPage slug="glp-1-weight-loss" />,
});
