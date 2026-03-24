import React from "react";
import { OrderItemError } from "../../utils/orderValidations";
import { Product } from "../../types";

interface SelectedProduct extends Product { quantity: number; }

interface Props {
  selectedProductsList: SelectedProduct[];
  total: number;
  errors: OrderItemError[];
  products: Product[];
  isSubmitting: boolean;
  orderLoading: boolean;
  submitAttempts: number;
  onSubmit: () => void;
  onClear: () => void;
}

const OrderSummary: React.FC<Props> = ({
  selectedProductsList, total, errors, products,
  isSubmitting, orderLoading, submitAttempts, onSubmit, onClear,
}) => (
  <div className="bg-white rounded-xl shadow-lg sticky top-8">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      <p className="text-sm text-gray-500 mt-1">Review your order</p>
    </div>

    {selectedProductsList.length === 0 ? (
      <div className="p-6 text-center">
        <p className="mt-2 text-gray-500">No items selected</p>
        <p className="text-sm text-gray-400">Add products to create an order</p>
      </div>
    ) : (
      <>
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {selectedProductsList.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity} · ${Number(item.price || 0).toFixed(2)} each</p>
              </div>
              <p className="text-sm font-semibold">${(Number(item.price || 0) * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-indigo-600">${total.toFixed(2)}</span>
          </div>

          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium mb-1">Please fix the following issues:</p>
              <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx}>{products.find((p) => p.id === error.productId)?.name}: {error.message}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={onSubmit} disabled={isSubmitting || orderLoading || errors.length > 0}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium transition-colors">
            {isSubmitting || orderLoading ? "Processing..." : "Confirm Order"}
          </button>
          <button onClick={onClear} disabled={isSubmitting || orderLoading}
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors">
            Clear Cart
          </button>

          {submitAttempts > 0 && (
            <p className="text-xs text-gray-400 text-center">Submit attempts: {submitAttempts}</p>
          )}
        </div>
      </>
    )}
  </div>
);

export default OrderSummary;