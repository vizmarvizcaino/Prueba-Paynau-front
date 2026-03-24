import { useState, useCallback, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { useProducts } from "./useProducts";
import { useOrders } from "./useOrders";
import { validateStock, calculateTotal, OrderItemError } from "../utils/orderValidations";

export const useOrderForm = () => {
  const { products, fetchProducts, loading: productsLoading } = useProducts();
  const { createOrder, loading: orderLoading } = useOrders();

  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<OrderItemError[]>([]);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  useEffect(() => {
    setErrors(validateStock(selectedItems, products));
  }, [selectedItems, products]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const product = products.find((p) => p.id === productId);

    if (product && quantity > product.stock) {
      toast.error(`Cannot add more than ${product.stock} units of ${product.name}`);
      return;
    }

    setSelectedItems((prev) => {
      const next = new Map(prev);
      quantity <= 0 ? next.delete(productId) : next.set(productId, quantity);
      return next;
    });
    setSubmitAttempts(0);
  }, [products]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || orderLoading) {
      toast.error("Please wait, your order is being processed");
      return;
    }
    if (selectedItems.size === 0) {
      toast.error("Please add at least one item to the order");
      return;
    }

    const currentErrors = validateStock(selectedItems, products);
    if (currentErrors.length > 0) {
      toast.error("Please fix the stock issues before submitting");
      return;
    }

    const items = Array.from(selectedItems.entries()).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error("Product not found");
      if (product.stock < quantity) throw new Error(`Insufficient stock for ${product.name}`);
      return { product_id: productId, quantity };
    });

    setIsSubmitting(true);
    setSubmitAttempts((prev) => prev + 1);

    try {
      await createOrder({ items });
      toast.success("Order created successfully!");
      setSelectedItems(new Map());
      await fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message || "Failed to create order");
      await fetchProducts();
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedItems, products, createOrder, fetchProducts, isSubmitting, orderLoading]);

  const debouncedSubmit = useMemo(
    () => debounce(handleSubmit, 500, { leading: true, trailing: false }),
    [handleSubmit]
  );

  const total = useMemo(() => calculateTotal(selectedItems, products), [selectedItems, products]);

  const selectedProductsList = useMemo(() =>
    Array.from(selectedItems.entries())
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean),
    [selectedItems, products]
  );

  return {
    products,
    productsLoading,
    orderLoading,
    selectedItems,
    isSubmitting,
    errors,
    submitAttempts,
    total,
    selectedProductsList,
    updateQuantity,
    debouncedSubmit,
    clearCart: () => setSelectedItems(new Map()),
  };
};