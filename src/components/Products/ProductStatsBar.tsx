import React from "react";

interface Props {
  total: number;
  inStock: number;
  outOfStock: number;
}

const STATS_CONFIG = [
  {
    key: "total" as const,
    label: "Total Products",
    color: { bg: "bg-indigo-100", icon: "text-indigo-600" },
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    key: "inStock" as const,
    label: "In Stock",
    color: { bg: "bg-green-100", icon: "text-green-600" },
    iconPath: "M5 13l4 4L19 7",
  },
  {
    key: "outOfStock" as const,
    label: "Out of Stock",
    color: { bg: "bg-red-100", icon: "text-red-600" },
    iconPath: "M6 18L18 6M6 6l12 12",
  },
];

const ProductStatsBar: React.FC<Props> = (props) => (
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {STATS_CONFIG.map(({ key, label, color, iconPath }) => (
      <div key={key} className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{props[key]}</p>
          </div>
          <div
            className={`w-10 h-10 ${color.bg} rounded-full flex items-center justify-center`}
          >
            <svg
              className={`w-5 h-5 ${color.icon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={iconPath}
              />
            </svg>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProductStatsBar;
