import React from "react";
import { useOrderForm } from "../../hooks/useOrderForm";
import ProductItem from "../../components/Orders/ProductItem";
import OrderSummary from "../../components/Orders/OrderSummary";

const OrderForm: React.FC = () => {
  const {
    products, productsLoading, orderLoading,
    selectedItems, isSubmitting, errors, submitAttempts,
    total, selectedProductsList,
    updateQuantity, debouncedSubmit, clearCart,
  } = useOrderForm();

  if (productsLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New Order</h1>
          <p className="text-gray-600 mt-1">Create a new order by selecting products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Available Products</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  quantity={selectedItems.get(product.id) || 0}
                  errors={errors}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              selectedProductsList={selectedProductsList as any}
              total={total}
              errors={errors}
              products={products}
              isSubmitting={isSubmitting}
              orderLoading={orderLoading}
              submitAttempts={submitAttempts}
              onSubmit={debouncedSubmit}
              onClear={clearCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;