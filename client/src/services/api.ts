import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const placeOrder = async (order: {
  restaurantId: string;
  quantity: number;
  deliveryOption: 'delivery' | 'pickup';
  address?: string;
  name: string;
  phoneNumber: string;
}) => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await api.patch(`/orders/${orderId}/status`, { orderId, status });
  return response.data;
};