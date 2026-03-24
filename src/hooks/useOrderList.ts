import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useOrders } from "./useOrders";
import { FilterType, filterOrders, calcStatistics } from "../utils/orderListUtils";

export const useOrderList = () => {
  const { orders, loading, error, fetchOrders } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) fetchOrders();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders, loading]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
    toast.success("Orders refreshed");
  };

  const toggleExpanded = (orderId: number) =>
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));

  return {
    loading,
    error,
    orders,
    expandedOrder,
    refreshing,
    filter,
    searchTerm,
    filteredOrders: filterOrders(orders, filter, searchTerm),
    statistics: calcStatistics(orders),
    handleRefresh,
    toggleExpanded,
    setFilter,
    setSearchTerm,
  };
};