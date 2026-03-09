import { getAllParts, getAllMakes, getAllCategories } from "@/lib/data";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Parts Catalog — AutoParts",
};

export default function CatalogPage() {
  const parts = getAllParts();
  const makes = getAllMakes();
  const categories = getAllCategories();

  return <CatalogClient parts={parts} makes={makes} categories={categories} />;
}
