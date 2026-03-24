import api from './api';
import { Order, CreateOrderDTO } from '../types';

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  return response.data;
};

export const createOrder = async (data: CreateOrderDTO): Promise<Order> => {
  const response = await api.post('/orders', data);
  return response.data;
};