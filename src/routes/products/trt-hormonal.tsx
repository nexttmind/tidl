import { createFileRoute } from "@tanstack/react-router";
import ProductPdpPage from "@/components/pdp/ProductPdpPage";
import { PDP_META } from "@/components/pdp/data/pdp-data-registry";

export const Route = createFileRoute("/products/trt-hormonal")({
  head: () => ({
    meta: [
      { title: PDP_META["trt-hormonal"].title },
      { name: "description", content: PDP_META["trt-hormonal"].description },
      { property: "og:title", content: PDP_META["trt-hormonal"].title },
      { property: "og:description", content: PDP_META["trt-hormonal"].description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ProductPdpPage slug="trt-hormonal" />,
});
