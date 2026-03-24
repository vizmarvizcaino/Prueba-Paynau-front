import React from "react";
import { Order } from "../../types";
import { formatOrderDate } from "../../utils/orderListUtils";

interface Props {
  order: Order;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

const OrderCard: React.FC<Props> = ({ order, isExpanded, onToggle }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
    {/* Header clickeable */}
    <div
      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onToggle(order.id)}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.id}
            </h3>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Completed
            </span>
            {order.items.length > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatOrderDate(order.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {order.items.reduce((sum, item) => sum + item.quantity, 0)} units
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            ${Number(order.total).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Total amount</p>
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    {/* Detalle expandido */}
    {isExpanded && (
      <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Order Items
        </h4>

        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.product_name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Quantity: {item.quantity} × $
                  {Number(item.price_at_time).toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                $
                {(Number(item.price_at_time) * Number(item.quantity)).toFixed(
                  2,
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">Subtotal:</span>
          <span className="text-base font-bold text-indigo-600">
            ${Number(order.total).toFixed(2)}
          </span>
        </div>
      </div>
    )}
  </div>
);

export default OrderCard;
