import React from "react";
import { Product } from "../../types";
import { getItemError, OrderItemError } from "../../utils/orderValidations";

interface Props {
  product: Product;
  quantity: number;
  errors: OrderItemError[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const ProductItem: React.FC<Props> = ({ product, quantity, errors, onUpdateQuantity }) => {
  const error = getItemError(product.id, errors);
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className={`p-6 hover:bg-gray-50 transition-colors ${error ? "bg-red-50" : ""}`}>
      <div className="flex items-start gap-4">
        {/* Imagen */}
        <div className="flex-shrink-0">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/80?text=No+Image"; }}
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            {isLowStock && <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>}
            {product.stock === 0 && <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">Out of Stock</span>}
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description || "No description available"}</p>
          <span className="text-2xl font-bold text-indigo-600">${Number(product.price || 0).toFixed(2)}</span>
          <span className="text-sm text-gray-500 ml-1">/ unit</span>
          <p className="text-xs text-gray-400 mt-1">Available: {product.stock} units</p>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>

        {/* Controles de cantidad */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} disabled={quantity === 0 || product.stock === 0}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <input type="number" min="0" max={product.stock} value={quantity || ""}
              onChange={(e) => onUpdateQuantity(product.id, parseInt(e.target.value) || 0)}
              disabled={product.stock === 0}
              className={`w-16 text-center rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? "border-red-300" : "border-gray-300"} ${product.stock === 0 ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
            <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} disabled={quantity >= product.stock || product.stock === 0}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          {quantity > 0 && (
            <button onClick={() => onUpdateQuantity(product.id, 0)} className="mt-2 text-xs text-red-600 hover:text-red-700 w-full text-center">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;