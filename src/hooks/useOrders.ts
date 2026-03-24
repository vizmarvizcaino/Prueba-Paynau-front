import { useState, useEffect, useCallback } from 'react';
import { Order, CreateOrderDTO } from '../types';
import * as orderService from '../services/orderService';
import toast from 'react-hot-toast';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch orders';
      setError(message);
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (data: CreateOrderDTO) => {
    setLoading(true);
    try {
      const newOrder = await orderService.createOrder(data);
      setOrders(prev => [newOrder, ...prev]);
      setLastCreatedOrder(newOrder);
      toast.success(`Order #${newOrder.id} created successfully!`);
      return newOrder;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to create order';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    lastCreatedOrder,
    fetchOrders,
    createOrder,
  };
};