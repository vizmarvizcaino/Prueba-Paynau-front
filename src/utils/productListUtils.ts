import { Product } from "../types";

export const filterProducts = (
  products: Product[],
  searchTerm: string,
): Product[] =>
  products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

export const calcProductStats = (products: Product[]) => ({
  total: products.length,
  inStock: products.filter((p) => p.stock > 0).length,
  outOfStock: products.filter((p) => p.stock === 0).length,
});

export const getStockBadge = (stock: number) => {
  if (stock === 0)
    return { label: "Out of Stock", className: "bg-red-100 text-red-800" };
  if (stock <= 10)
    return {
      label: `${stock} left`,
      className: "bg-yellow-100 text-yellow-800",
    };
  return { label: `${stock} left`, className: "bg-green-100 text-green-800" };
};
