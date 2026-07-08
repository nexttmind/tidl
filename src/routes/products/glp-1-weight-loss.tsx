import { createFileRoute } from "@tanstack/react-router";
import Glp1PdpPage from "@/components/pdp/Glp1PdpPage";

export const Route = createFileRoute("/products/glp-1-weight-loss")({
  head: () => ({
    meta: [
      { title: "GLP-1 Weight Loss Program | Tidl Health" },
      {
        name: "description",
        content:
          "Doctor-prescribed GLP-1 weight loss with the pre-dosed TIDL Pen. Take a 5-minute quiz, get reviewed by a licensed provider, and receive discreet delivery.",
      },
      { property: "og:title", content: "GLP-1 Weight Loss Program | Tidl Health" },
      {
        property: "og:description",
        content:
          "Doctor-prescribed GLP-1 weight loss with the pre-dosed TIDL Pen. Take a 5-minute quiz and receive discreet delivery.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Glp1PdpPage,
});
