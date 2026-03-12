import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';

// Updated Restaurant interface to match backend response
interface Restaurant {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
}

export default function Order() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch restaurant details based on restaurantId
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get(`/restaurants/${restaurantId}`);
        const data = response.data;
        setRestaurant(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1;
    setQuantity(value > 0 ? value : 1);
  };

  // Handle order submission (simplified, assuming API integration later)
  const handleOrder = async () => {
    if (!restaurant) return;

    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage after login
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      const response = await axiosInstance.post('/orders', {
          restaurantId: restaurant._id,
          quantity: quantity,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (!data?.order?._id) {
        throw new Error('Failed to place order');
      }

      alert(`Order placed successfully! Order ID: ${data.order._id}`);
      navigate('/'); // Redirect to landing page after success
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order {restaurant.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={restaurant.image} alt={restaurant.name} className="w-full md:w-1/2 rounded-lg" />
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.description}</p>
          <p className="text-lg font-bold mt-2">{restaurant.price}</p>
          <div className="mt-4">
            <label className="block mb-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}