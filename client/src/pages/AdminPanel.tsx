import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, RefreshCw } from 'lucide-react';

interface Order {
  _id: string;
  name: string;
  phoneNumber: string;
  items: { restaurantId: string; name: string; price: number; quantity: number; drink?: string; extraCheese?: boolean }[];
  total: number;
  status: string;
  paymentMethod: 'cash on delivery';
  deliveryOption: 'delivery' | 'pickup';
  address?: string;
  createdAt: string;
}

const buttonHover = {
  scale: 1.05,
  boxShadow: '0 25px 50px rgba(234, 179, 8, 0.35)',
  transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
};

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders');
      if (!response.ok) {
        // Handle HTTP errors (e.g., 500, 404)
        const errorData = await response.json(); // Parse the error response from the server
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error('Invalid data format: expected an array of orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white p-4 sm:p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-zinc-800/50 backdrop-blur-2xl border border-white/10 rounded-2xl animate-pulse">
                  <CardHeader>
                    <CardTitle className="h-6 bg-zinc-700/50 rounded w-1/2"></CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-4 bg-zinc-700/50 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-700/50 rounded w-1/2"></div>
                    <div className="h-4 bg-zinc-700/50 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white p-4 sm:p-8">
        <div className="container mx-auto max-w-7xl text-center py-20">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 p-3 rounded-xl font-bold text-lg shadow-xl hover:shadow-yellow-500/30 transition-all duration-500"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-5 w-5" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Restaurant Admin Panel
        </motion.h1>
        {orders.length === 0 ? (
          <p className="text-gray-300 text-center">No orders yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl hover:border-yellow-500/20 transition-colors duration-500">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-yellow-500">
                      Order #{order._id.slice(-6)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p><strong>Customer:</strong> {order.name}</p>
                    <p><strong>Phone:</strong> {order.phoneNumber}</p>
                    <p><strong>{order.deliveryOption === 'delivery' ? 'Address' : 'Pickup'}:</strong> {order.address || 'N/A'}</p>
                    <p><strong>Payment:</strong> {order.paymentMethod}</p>
                    <div>
                      <strong>Items:</strong>
                      <ul className="list-disc pl-5">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-gray-300">
                            {item.name} - ${(item.price + (item.extraCheese ? 1 : 0) + (item.drink === 'cola' ? 2.5 : item.drink === 'lemonade' ? 2 : item.drink === 'water' ? 1.5 : 0)).toFixed(2)} x {item.quantity}
                            {item.drink && `, ${item.drink}`}
                            {item.extraCheese && ', Extra Cheese'}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        <motion.div whileHover={buttonHover} className="mt-8 text-center">
          <Button
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 p-3 rounded-xl font-bold text-lg shadow-xl hover:shadow-yellow-500/30 transition-all duration-500"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-5 w-5" /> Refresh Orders
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}