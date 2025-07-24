"use client";

import type React from "react";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, X, ShoppingCart, Star, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/Context";

// Updated BurgerItem interface to match Checkout.tsx
interface BurgerItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  quantity: number;
  drink?: string;
  extraCheese?: boolean;
  isDeal?: boolean;
}

const BurgerMenu: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [burgers, setBurgers] = useState<BurgerItem[]>([
    {
      _id: "1",
      name: "Beef Jalapeno",
      price: 670,
      description: "Spicy beef patty with jalapenos and cheese",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "2",
      name: "The Beast",
      price: 690,
      description: "Double beef patty with bacon and BBQ sauce",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "3",
      name: "Beef Fiesco (Spicy)",
      price: 660,
      description: "Spicy beef patty with salsa and peppers",
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "4",
      name: "Beef Binda",
      price: 999,
      description: "Classic single beef patty with lettuce and tomato",
      image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "5",
      name: "Beef BBQ Crunch",
      price: 720,
      description: "Beef patty with BBQ sauce and crispy onions",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "6",
      name: "Beef Spicy Inferno",
      price: 750,
      description: "Extra spicy beef patty with hot sauce",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "7",
      name: "Beef Classic",
      price: 620,
      description: "Traditional beef patty with lettuce and mayo",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "8",
      name: "Beef Mushroom Melt",
      price: 790,
      description: "Beef patty with mushrooms and melted cheese",
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
    {
      _id: "9",
      name: "Beef Pepper Jack",
      price: 710,
      description: "Beef patty with pepper jack cheese and jalapeños",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
      quantity: 0,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drinkOption, setDrinkOption] = useState<string>("cola");
  const [extraCheese, setExtraCheese] = useState<boolean>(false);

  // Sync local state with CartContext
  useEffect(() => {
    setBurgers((prevBurgers) =>
      prevBurgers.map((burger) => {
        const cartItem = cart.find((item) => item._id === burger._id);
        if (cartItem) {
          return {
            ...burger,
            quantity: cartItem.quantity ?? 0,
            drink: cartItem.drink,
            extraCheese: cartItem.extraCheese,
          };
        }
        return burger;
      }) as typeof prevBurgers
    );
  }, [cart]);

  const addToCartHandler = (id: string) => {
    const burger = burgers.find((b) => b._id === id);
    if (burger) {
      addToCart({
        ...burger,
        quantity: (burger.quantity || 0) + 1,
        drink: drinkOption,
        extraCheese,
        description: burger.description ?? "",
      });
      setIsCartOpen(true); // Open sidebar immediately after adding
    }
  };

  const removeFromCartHandler = (id: string) => {
    const burger = burgers.find((b) => b._id === id);
    if (burger && burger.quantity > 0) {
      removeFromCart(id);
    }
  };

  const cartItems = burgers.filter((burger) => burger.quantity > 0);
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity +
      (item.extraCheese ? 100 : 0) +
      (item.drink === "cola"
        ? 250
        : item.drink === "lemonade"
        ? 200
        : item.drink === "water"
        ? 150
        : 0),
    0,
  );

  // Enhanced Animation variants
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 25px 50px rgba(234, 179, 8, 0.4)",
    transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
  };

  const cardHover = {
    y: -8,
    scale: 1.03,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  };

  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-none sm:rounded-4xl from-gray-900 via-black to-gray-800 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-full sm:max-w-7xl mx-auto relative">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-2 w-20 h-20 sm:top-20 sm:left-10 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-10 blur-xl"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-24 right-4 w-16 h-16 sm:top-40 sm:right-20 sm:w-24 sm:h-24 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-15 blur-xl"
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-24 left-1/4 w-24 h-24 sm:bottom-40 sm:w-40 sm:h-40 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-10 blur-2xl"
            animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Enhanced Hero Banner */}
        <motion.div
          className="relative bg-gradient-to-r from-gray-900 via-black to-gray-800 border border-yellow-500/20 rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-8 shadow-2xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23fbbf24%22 fillOpacity%3D%220.05%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

          <div className="relative p-4 xs:p-6 sm:p-8 md:p-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div animate={sparkleAnimation}>
                      <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
                    </motion.div>
                    <span className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-yellow-400 text-xs sm:text-sm font-medium border border-yellow-400/30">
                      Premium Quality
                    </span>
                  </div>
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-2 sm:mb-4 tracking-tight leading-tight">
                    BEEF
                    <span className="block bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                      BURGER
                    </span>
                  </h1>
                  <p className="text-gray-300 text-base xs:text-lg sm:text-xl font-medium max-w-full sm:max-w-md">
                    Crafted with passion, served with excellence
                  </p>
                </motion.div>
              </div>

              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative group mt-4 sm:mt-0"
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-yellow-400/10 backdrop-blur-xl p-3 xs:p-4 sm:p-5 rounded-2xl border border-yellow-400/20 shadow-2xl">
                  <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
                  {cart.length > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs sm:text-sm font-bold w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full shadow-lg border-2 border-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {cart.reduce((total, item) => total + (item.quantity ?? 0), 0)}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            >
              <motion.div
                className="absolute right-0 top-0 h-full w-full xs:w-[95vw] sm:w-[90vw] max-w-full sm:max-w-[500px] bg-gray-900/95 backdrop-blur-xl border-l border-yellow-400/20 shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 xs:p-6 border-b border-yellow-400/20 bg-gradient-to-r from-gray-900 to-black">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl xs:text-2xl font-bold text-white">Your Cart</h2>
                      <p className="text-yellow-400 text-xs xs:text-sm">
                        {cart.length} {cart.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                    <motion.button
                      className="p-2 hover:bg-yellow-400/20 rounded-xl transition-colors"
                      onClick={() => setIsCartOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-6 w-6 text-yellow-400" />
                    </motion.button>
                  </div>
                </div>

                <div className="h-[calc(100vh-10rem)] xs:h-[calc(100vh-12rem)] overflow-y-auto p-4 xs:p-6">
                  {cart.length > 0 ? (
                    <div className="space-y-4 xs:space-y-6">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item._id}
                          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 xs:p-4 border border-yellow-400/20 shadow-lg"
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                            <div className="relative w-full xs:w-24 h-24 rounded-xl overflow-hidden mx-auto xs:mx-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              <div className="absolute top-2 right-2">
                                <Heart className="h-4 w-4 text-yellow-400" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base xs:text-lg font-bold text-white">{item.name}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-xs text-gray-400 ml-1">(4.8)</span>
                              </div>
                              <p className="text-yellow-400 font-bold text-base xs:text-lg mt-2">
                                Rs.{" "}
                                {(
                                  item.price +
                                  (item.extraCheese ? 100 : 0) +
                                  (item.drink === "cola"
                                    ? 250
                                    : item.drink === "lemonade"
                                    ? 200
                                    : item.drink === "water"
                                    ? 150
                                    : 0)
                                ).toFixed(0)}
                              </p>
                              <div className="flex items-center gap-2 xs:gap-3 mt-3">
                                <motion.button
                                  onClick={() => removeFromCartHandler(item._id)}
                                  className="w-8 h-8 bg-gray-700 border border-gray-600 rounded-xl flex items-center justify-center text-gray-300 hover:bg-red-900/50 hover:text-red-400 hover:border-red-500/50 transition-all"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  -
                                </motion.button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(item._id, parseInt(e.target.value) || 1)
                                  }
                                  min="1"
                                  className="w-12 xs:w-16 p-1 rounded bg-white/[0.03] border border-white/10 text-white text-center"
                                />
                                <motion.button
                                  onClick={() => addToCartHandler(item._id)}
                                  className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-black hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg font-bold"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 xs:mt-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-3 xs:p-4 border border-yellow-400/10">
                            <h4 className="text-xs xs:text-sm font-semibold text-white mb-2 xs:mb-3 flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-yellow-400" />
                              Customize Your Order
                            </h4>
                            <select
                              value={drinkOption}
                              onChange={(e) => {
                                setDrinkOption(e.target.value);
                                if (typeof item.quantity === "number") {
                                  updateQuantity(item._id, item.quantity, e.target.value, extraCheese);
                                }
                              }}
                              className="w-full p-2 xs:p-3 bg-gray-900 border border-yellow-400/20 rounded-xl text-xs xs:text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all shadow-sm"
                            >
                              <option value="cola">🥤 Cola - $2.50</option>
                              <option value="lemonade">🍋 Lemonade - $2.00</option>
                              <option value="water">💧 Bottled Water - $1.50</option>
                              <option value="none">❌ No Drink</option>
                            </select>
                            <label className="flex items-center gap-2 xs:gap-3 mt-2 xs:mt-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={extraCheese}
                                onChange={(e) => {
                                  setExtraCheese(e.target.checked);
                                  if (typeof item.quantity === "number") {
                                    updateQuantity(item._id, item.quantity, drinkOption, e.target.checked);
                                  }
                                }}
                                className="w-5 h-5 rounded-lg border-2 border-yellow-400/30 text-yellow-400 focus:ring-yellow-400/20 transition-all bg-gray-800"
                              />
                              <span className="text-xs xs:text-sm text-gray-300 group-hover:text-yellow-400 transition-colors">
                                🧀 Add Extra Cheese (+$1.00)
                              </span>
                            </label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      className="text-center py-8 xs:py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-full w-16 h-16 xs:w-24 xs:h-24 flex items-center justify-center mx-auto mb-3 xs:mb-4">
                        <ShoppingCart className="h-8 w-8 xs:h-12 xs:w-12 text-gray-500" />
                      </div>
                      <p className="text-gray-400 text-base xs:text-lg font-medium">Your cart is empty</p>
                      <p className="text-gray-500 text-xs xs:text-sm mt-1">Add some delicious burgers!</p>
                    </motion.div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-yellow-400/20 p-4 xs:p-6">
                    <div className="flex flex-col xs:flex-row justify-between items-center mb-3 xs:mb-4 gap-2 xs:gap-0">
                      <span className="text-gray-300 font-medium text-base xs:text-lg">Total Amount</span>
                      <span className="text-2xl xs:text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                        Rs. {cartTotal}
                      </span>
                    </div>
                    <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black py-4 xs:py-6 rounded-2xl text-base xs:text-lg font-bold shadow-2xl transition-all duration-300 border-0"
                        onClick={() => navigate("/checkout")}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2 xs:mr-3" />
                        Proceed to Checkout
                        <Sparkles className="h-5 w-5 ml-2 xs:ml-3" />
                      </Button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Burger Grid */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {burgers.map((burger, index) => (
            <motion.div
              key={burger._id}
              className="group relative bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 border border-yellow-400/20 shadow-xl hover:shadow-2xl hover:border-yellow-400/40 transition-all duration-500"
              whileHover={cardHover}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Floating Badge */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  HOT
                </motion.div>
              </div>

              <div className="relative">
                <div className="relative w-full h-32 xs:h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-gradient-to-br from-gray-700 to-gray-800">
                  <img
                    src={burger.image || "/placeholder.svg"}
                    alt={burger.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating Heart Icon */}
                  <motion.button
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-black/70 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-4 w-4 text-yellow-400 hover:text-yellow-300 transition-colors" />
                  </motion.button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/50 backdrop-blur-sm px-2 py-1 sm:px-3 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">4.8</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-1 sm:mb-2">
                      {burger.name}
                    </h3>
                    {burger.description && (
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">{burger.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                        Rs. {burger.price}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>

                    {burger.quantity > 0 ? (
                      <div className="flex items-center gap-2 sm:gap-3 bg-gray-700/50 rounded-xl sm:rounded-2xl p-1 sm:p-2">
                        <motion.button
                          onClick={() => removeFromCartHandler(burger._id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 border border-gray-500 rounded-xl flex items-center justify-center text-gray-300 hover:bg-red-900/50 hover:text-red-400 hover:border-red-500/50 transition-all shadow-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          -
                        </motion.button>
                        <span className="font-bold text-white text-base sm:text-lg min-w-[2rem] text-center">{burger.quantity}</span>
                        <motion.button
                          onClick={() => addToCartHandler(burger._id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-black hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg font-bold"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => addToCartHandler(burger._id)}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg font-semibold text-sm sm:text-base"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(234, 179, 8, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BurgerMenu;