import React from "react";
import { useOrderList } from "../../hooks/useOrderList";
import OrderStatsBar from "../../components/Orders/OrderStatsBar";
import OrderFilters from "../../components/Orders/OrderFilters";
import OrderCard from "../../components/Orders/OrderCard";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import ErrorAlert from "../../components/Common/ErrorAlert";
import FloatingActionButton from "../../components/Common/FloatingActionButton";

const OrderList: React.FC = () => {
  const {
    loading,
    error,
    orders,
    expandedOrder,
    refreshing,
    filter,
    searchTerm,
    filteredOrders,
    statistics,
    handleRefresh,
    toggleExpanded,
    setFilter,
    setSearchTerm,
  } = useOrderList();

  if (loading && orders.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600 mt-1">
                Manage and track customer orders
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300 flex items-center gap-2 disabled:opacity-50 shadow-sm transition-colors"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <OrderStatsBar {...statistics} />
          <OrderFilters
            filter={filter}
            searchTerm={searchTerm}
            onFilterChange={setFilter}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Lista */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="mt-2 text-gray-500">No orders found</p>
            <p className="text-sm text-gray-400">
              {searchTerm || filter !== "all"
                ? "Try adjusting your filters"
                : "Create your first order to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrder === order.id}
                onToggle={toggleExpanded}
              />
            ))}
          </div>
        )}

        <FloatingActionButton />
      </div>
    </div>
  );
};

export default OrderList;
