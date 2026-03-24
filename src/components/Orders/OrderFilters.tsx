import React from "react";
import { FilterType } from "../../utils/orderListUtils";

interface Props {
  filter: FilterType;
  searchTerm: string;
  onFilterChange: (f: FilterType) => void;
  onSearchChange: (s: string) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

const OrderFilters: React.FC<Props> = ({
  filter,
  searchTerm,
  onFilterChange,
  onSearchChange,
}) => (
  <div className="mt-6 flex flex-col sm:flex-row gap-4">
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search by order ID or product name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div className="flex gap-2 flex-wrap">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === value
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default OrderFilters;
