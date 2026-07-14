import { createFileRoute, notFound } from "@tanstack/react-router";
import ProductPdpPage from "@/components/pdp/ProductPdpPage";
import { PDP_META } from "@/components/pdp/data/pdp-data-registry";
import { PRODUCT_SLUGS, type ProductSlug } from "@/types/quiz";

function isProductSlug(slug: string): slug is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(slug);
}

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    if (!isProductSlug(params.slug)) {
      return { meta: [{ title: "Not Found | Tidl Health" }] };
    }
    const meta = PDP_META[params.slug];
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();
  if (!isProductSlug(slug)) {
    throw notFound();
  }
  return <ProductPdpPage slug={slug} />;
}
