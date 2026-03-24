import { Product } from "../types";

export interface OrderItemError {
  productId: number;
  message: string;
}

export const validateStock = (
  selectedItems: Map<number, number>,
  products: Product[]
): OrderItemError[] => {
  const errors: OrderItemError[] = [];

  for (const [productId, quantity] of selectedItems) {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      errors.push({ productId, message: "Product not found" });
    } else if (product.stock < quantity) {
      errors.push({ productId, message: `Only ${product.stock} units available` });
    }
  }

  return errors;
};

export const calculateTotal = (
  selectedItems: Map<number, number>,
  products: Product[]
): number => {
  let total = 0;
  for (const [productId, quantity] of selectedItems) {
    const product = products.find((p) => p.id === productId);
    if (product) total += Number(product.price || 0) * quantity;
  }
  return total;
};

export const getItemError = (
  productId: number,
  errors: OrderItemError[]
): string | null => {
  return errors.find((e) => e.productId === productId)?.message ?? null;
};