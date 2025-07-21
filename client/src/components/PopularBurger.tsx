"use client";

import type React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Clock, Star, Plus, Heart, Sparkles, Zap } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { CartContext } from "@/context/Context";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const sparkleAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, 180, 360],
  transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
};

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  popular: boolean;
}

interface PopularBurgerProps {
  restaurants: Restaurant[];
  setSelectedBurger: (restaurant: Restaurant) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const PopularBurger: React.FC<PopularBurgerProps> = ({
  restaurants,
  setSelectedBurger,
  setIsSidebarOpen,
}) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (restaurant: Restaurant) => {
    setSelectedBurger(restaurant);
    setIsSidebarOpen(true);
    addToCart(restaurant);
  };

  const popularRestaurants = restaurants.filter((restaurant) => restaurant.popular);
  const displayRestaurants =
    popularRestaurants.length >= 6
      ? popularRestaurants.slice(0, 6)
      : [
          ...popularRestaurants,
          ...restaurants
            .filter((r) => !r.popular)
            .sort(() => 0.5 - Math.random())
            .slice(0, 6 - popularRestaurants.length),
        ].slice(0, 6);

  return (
    <div className="relative min-h-screen bg-gradient-to-br rounded-4xl mx-4 md:mx-12 mt-10 md:mt-14 py-10 md:py-20 lg:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-5 blur-2xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 right-10 md:right-20 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-10 blur-xl"
          animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-5 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        id="menu"
        className="relative mx-2 sm:mx-4 md:mx-8 lg:mx-16"
        variants={fadeIn}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* Heading */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:gap-6 text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-4 flex-wrap">
              <motion.div animate={sparkleAnimation}>
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              </motion.div>
              <span className="bg-yellow-400/20 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full text-yellow-400 text-xs sm:text-sm font-bold border border-yellow-400/30 shadow-lg">
                🔥 TRENDING NOW
              </span>
              <motion.div animate={sparkleAnimation}>
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              </motion.div>
            </div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Popular Burgers
            </motion.h2>
            <motion.p
              className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-4xl leading-relaxed font-medium px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hand-crafted burgers made with premium ingredients and our secret sauce.
              <span className="block text-yellow-400 text-xs sm:text-base mt-2">✨ Each burger is a masterpiece ✨</span>
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
            {displayRestaurants.length === 0 ? (
              <p className="text-gray-300 text-center col-span-full">No popular burgers available.</p>
            ) : (
              displayRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant._id}
                  variants={scaleUp}
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="group relative"
                >
                  {/* 🔥 CARD BLOCK UNCHANGED 🔥 */}
                  <Card className="relative overflow-hidden rounded-3xl bg-gray-800/80 backdrop-blur-sm border border-yellow-400/20 shadow-2xl hover:shadow-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    <div className="absolute -top-4 -right-4 z-30">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-xl border-2 border-black"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        🔥 HOT
                      </motion.div>
                    </div>
                    <CardHeader className="p-0 overflow-hidden">
                      <div className="relative h-64 sm:h-60 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                        <img
                          alt={restaurant.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                          src={restaurant.image || "/placeholder.svg"}
                          onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd")
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {restaurant.popular && (
                          <motion.div
                            className="absolute top-6 left-6 z-20"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                          >
                            <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-black rounded-full shadow-lg border border-black/20">
                              ⭐ POPULAR
                            </span>
                          </motion.div>
                        )}
                        <motion.div
                          className="absolute top-6 right-6 z-20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="bg-black/70 backdrop-blur-xl p-3 rounded-2xl border border-yellow-400/30 shadow-xl">
                            <span className="font-black text-yellow-400 text-lg">${(restaurant.price / 100).toFixed(2)}</span>
                          </div>
                        </motion.div>
                        <motion.button
                          className="absolute bottom-6 right-6 z-20 bg-black/50 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-black/70 transition-all"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className="h-5 w-5 text-yellow-400 hover:text-yellow-300 transition-colors" />
                        </motion.button>
                        <div className="absolute bottom-6 left-6 z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-bold text-sm">4.8</span>
                          <span className="text-gray-300 text-xs">(127)</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative p-8 bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-sm">
                      <div className="space-y-6">
                        <div>
                          <CardTitle className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-3 group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-300">
                            {restaurant.name}
                          </CardTitle>
                          <CardDescription className="text-gray-300 text-base leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors">
                            {restaurant.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm flex-wrap">
                            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-xl">
                              <Clock className="h-4 w-4 text-yellow-400" />
                              <span className="text-gray-300 font-medium">15-20 min</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-xl">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-gray-300 font-medium">4.8</span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-black text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/40 active:scale-95 transform border-2 border-black/20 shadow-xl"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(restaurant)}
                        >
                          <span className="flex items-center justify-center gap-3">
                            <Plus className="h-5 w-5" />
                            Add to Order
                            <Sparkles className="h-5 w-5" />
                          </span>
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PopularBurger;
