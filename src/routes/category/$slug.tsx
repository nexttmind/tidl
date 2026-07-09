import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, isCategorySlug } from "@/components/category/CategoryPage";
import { getCategory } from "@/lib/categories";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    if (!isCategorySlug(params.slug)) {
      return { meta: [{ title: "Not Found | Tidl Health" }] };
    }
    const category = getCategory(params.slug);
    return {
      meta: [
        { title: category.metaTitle },
        { name: "description", content: category.metaDescription },
        { property: "og:title", content: category.metaTitle },
        { property: "og:description", content: category.metaDescription },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: CategoryRoute,
});

function CategoryRoute() {
  const { slug } = Route.useParams();
  if (!isCategorySlug(slug)) {
    throw notFound();
  }
  return <CategoryPage slug={slug} />;
}
