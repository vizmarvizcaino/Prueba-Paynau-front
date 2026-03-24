import { Order } from "../types";

export type FilterType = "all" | "today" | "week" | "month";

export const filterOrders = (
  orders: Order[],
  filter: FilterType,
  searchTerm: string
): Order[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let filtered = [...orders];

  if (filter === "today") filtered = filtered.filter((o) => new Date(o.created_at) >= today);
  else if (filter === "week") filtered = filtered.filter((o) => new Date(o.created_at) >= weekAgo);
  else if (filter === "month") filtered = filtered.filter((o) => new Date(o.created_at) >= monthAgo);

  if (searchTerm) {
    filtered = filtered.filter(
      (o) =>
        o.id.toString().includes(searchTerm) ||
        o.items.some((item) =>
          item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }

  return filtered;
};

export const calcStatistics = (orders: Order[]) => {
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  return {
    total: orders.length,
    totalRevenue,
    averageOrder: orders.length > 0 ? totalRevenue / orders.length : 0,
    totalItems: orders.reduce((sum, o) => sum + o.items.length, 0),
  };
};

export const formatOrderDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });