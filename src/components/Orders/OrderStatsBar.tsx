import React from "react";

interface Stat {
  label: string;
  value: string;
  color: "indigo" | "green" | "blue" | "purple";
  icon: React.ReactNode;
}

interface Props {
  total: number;
  totalRevenue: number;
  averageOrder: number;
  totalItems: number;
}

const iconPaths = {
  bag: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  dollar:
    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  chart:
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
};

const colorMap = {
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    value: "text-gray-900",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    value: "text-green-600",
  },
  blue: { bg: "bg-blue-100", text: "text-blue-600", value: "text-blue-600" },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    value: "text-purple-600",
  },
};

const StatCard: React.FC<Stat> = ({ label, value, color, icon }) => {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-2xl font-bold ${c.value}`}>{value}</p>
        </div>
        <div
          className={`w-10 h-10 ${c.bg} rounded-full flex items-center justify-center`}
        >
          <svg
            className={`w-5 h-5 ${c.text}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon as string}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const OrderStatsBar: React.FC<Props> = ({
  total,
  totalRevenue,
  averageOrder,
  totalItems,
}) => {
  const stats: Stat[] = [
    {
      label: "Total Orders",
      value: String(total),
      color: "indigo",
      icon: iconPaths.bag,
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      color: "green",
      icon: iconPaths.dollar,
    },
    {
      label: "Average Order Value",
      value: `$${averageOrder.toFixed(2)}`,
      color: "blue",
      icon: iconPaths.chart,
    },
    {
      label: "Total Items Sold",
      value: String(totalItems),
      color: "purple",
      icon: iconPaths.box,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default OrderStatsBar;
