import axiosInstance from '@/api/axiosInstance';

export const placeOrder = async (order: {
  restaurantId: string;
  quantity: number;
  deliveryOption: 'delivery' | 'pickup';
  address?: string;
  name: string;
  phoneNumber: string;
}) => {
  const response = await axiosInstance.post('/orders', order);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axiosInstance.patch(`/orders/${orderId}/status`, { orderId, status });
  return response.data;
};