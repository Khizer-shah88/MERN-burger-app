import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const buttonHover = {
  scale: 1.05,
  boxShadow: '0 25px 50px rgba(234, 179, 8, 0.35)',
  transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
};

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, paymentMethod } = location.state || {};

  return (
    <motion.div
      className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-zinc-800 text-white flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <CheckCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
          Order Confirmed!
        </h1>
        <p className="text-gray-300 mb-6">
          Your order has been successfully placed. 
          {paymentMethod === 'cash on delivery' ? ' Pay with cash on delivery.' : ' Pick up your order at the restaurant.'}
        </p>
        {cart && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-yellow-500">Order Details</h2>
            <ul className="text-gray-300 list-disc list-inside">
              {cart.map((item: any) => (
                <li key={item._id}>
                  {item.name} - ${(item.price / 100 + (item.extraCheese ? 1 : 0) + (item.drink === 'cola' ? 2.5 : item.drink === 'lemonade' ? 2 : item.drink === 'water' ? 1.5 : 0)).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
        <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 p-3 rounded-xl font-bold text-lg shadow-xl hover:shadow-yellow-500/30 transition-all duration-500"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}