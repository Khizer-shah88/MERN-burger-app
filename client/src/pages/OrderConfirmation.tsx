import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, UtensilsCrossed, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const buttonHover = {
  scale: 1.05,
  boxShadow: '0 25px 50px rgba(234, 179, 8, 0.35)',
  transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
};

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, payment } = location.state || {};

  return (
    <motion.div
      className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-zinc-800 text-white flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-1.5 rounded-lg">
            <UtensilsCrossed className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">BurgerBite</span>
        </Link>
      </div>

      <motion.div
        className="bg-gradient-to-b from-zinc-800/60 to-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center mt-10"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Success icon */}
        <motion.div
          className="relative inline-block mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
        >
          <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full animate-pulse" />
          <CheckCircle className="h-20 w-20 text-yellow-400 relative" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          className="text-gray-400 mb-6 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {payment?.method === 'cash_on_delivery' || payment?.method === 'jazzcash' || payment?.method === 'easypaisa'
            ? 'Your order has been received. Pay on delivery.'
            : payment?.method === 'credit_card' || payment?.method === 'paypal' || payment?.method === 'bank_card_pk'
            ? 'Payment processed. Your order is on its way!'
            : 'Your order has been successfully placed.'}
        </motion.p>

        {/* Order info cards */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {order?.id && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-left">
              <p className="text-gray-500 text-xs mb-0.5">Order ID</p>
              <p className="text-yellow-400 font-bold text-sm">#{order.id.slice(-8).toUpperCase()}</p>
            </div>
          )}
          {order?.total && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-left">
              <p className="text-gray-500 text-xs mb-0.5">Total</p>
              <p className="text-white font-bold text-sm">${order.total}</p>
            </div>
          )}
          {payment?.method && (
            <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 text-left flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-gray-500 text-xs">Payment</p>
                <p className="text-white font-semibold text-sm capitalize">{payment.method.replace(/_/g, ' ')}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Order items */}
        {order?.items && order.items.length > 0 && (
          <motion.div
            className="mb-6 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Order Items</h2>
            <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
              {order.items.map((item: any, i: number) => (
                <li key={i} className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-gray-300">{item.name || `Item x${item.quantity || 1}`}</span>
                  {item.price && (
                    <span className="text-yellow-400 font-medium">
                      ${((item.price / 100 + (item.extraCheese ? 1 : 0)) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* ETA */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-8">
          <Clock className="h-4 w-4 text-yellow-400" />
          Estimated delivery: <span className="text-white font-semibold">25–35 min</span>
        </div>

        <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500 py-3 rounded-xl font-black text-base shadow-xl hover:shadow-yellow-500/30 transition-all duration-500"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}