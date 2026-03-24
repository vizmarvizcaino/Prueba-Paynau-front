import { Product } from "./index";

export interface OrderItemError {
  productId: number;
  message: string;
}

export interface SelectedItem {
  productId: number;
  quantity: number;
  product?: Product;
}

export interface UseOrderFormReturn {
  products: Product[];
  selectedItems: Map<number, number>;
  isSubmitting: boolean;
  errors: OrderItemError[];
  submitAttempts: number;
  productsLoading: boolean;
  orderLoading: boolean;
  updateQuantity: (productId: number, quantity: number) => void;
  handleSubmit: () => Promise<void>;
  clearCart: () => void;
  getTotal: number;
  getItemError: (productId: number) => string | null;
  selectedProductsList: SelectedItem[];
  debouncedSubmit: () => void;
}