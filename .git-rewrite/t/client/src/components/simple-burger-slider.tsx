"use client"

import type React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules"
import { ChevronLeft, ChevronRight, Star, Clock, X, Sparkles, Heart, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import { CartContext } from "@/context/Context"

interface Burger {
  _id: string // Matches Context.tsx and MongoDB
  name: string
  image: string
  price: number // Dollars to match backend
  rating: number
  time: string
  description: string
  drink?: string
  extraCheese?: boolean
  quantity?: number
}

const burgers: Burger[] = [
  {
    _id: "670d4f5b8f8b8e8b8e8b8e8b",
    name: "Classic Cheese",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    price: 12.99,
    rating: 4.8,
    time: "15-20",
    description: "Melted cheddar, fresh lettuce, juicy tomatoes",
  },
  {
    _id: "670d4f5b8f8b8e8b8e8b8e8c",
    name: "BBQ Bacon",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop",
    price: 15.99,
    rating: 4.9,
    time: "20-25",
    description: "Crispy bacon, BBQ sauce, cheddar cheese, onion rings",
  },
  {
    _id: "670d4f5b8f8b8e8b8e8b8e8d",
    name: "Spicy Mexican",
    image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=400&fit=crop",
    price: 14.99,
    rating: 4.7,
    time: "20-25",
    description: "Spicy jalapeños, pepper jack cheese, chipotle sauce",
  },
  {
    _id: "670d4f5b8f8b8e8b8e8b8e8e",
    name: "Mushroom Swiss",
    image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&h=400&fit=crop",
    price: 13.99,
    rating: 4.6,
    time: "15-20",
    description: "Sautéed mushrooms, Swiss cheese, garlic aioli",
  },
  {
    _id: "670d4f5b8f8b8e8b8e8b8e8f",
    name: "Veggie Supreme",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop",
    price: 13.99,
    rating: 4.5,
    time: "15-20",
    description: "Plant-based patty, avocado, sprouts, vegan mayo",
  },
  {
    _id: "670d4f5b8f8b8e8b8e8b8e90",
    name: "Double Cheese",
    image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&h=400&fit=crop",
    price: 16.99,
    rating: 4.8,
    time: "20-25",
    description: "Double patty, double cheese, special sauce",
  },
]

export default function SimpleBurgerSlider() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null)
  const [drinkOption, setDrinkOption] = useState<string>("cola")
  const [extraCheese, setExtraCheese] = useState<boolean>(false)
  const { cart, addToCart } = useContext(CartContext)

  const handleAddToCart = (burger: Burger) => {
    const cartItem: Burger = {
      ...burger,
      drink: drinkOption === "none" ? undefined : drinkOption,
      extraCheese,
      quantity: 1,
    }
    addToCart(cartItem)
    setIsSidebarOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setDrinkOption("cola")
    setExtraCheese(false)
    setSelectedBurger(null)
  }

  const calculatePrice = (price: number, extraCheese: boolean, drink: string): string => {
    const basePrice = price
    const extraCheesePrice = extraCheese ? 1 : 0
    const drinkPrice = drink === "cola" ? 2.5 : drink === "lemonade" ? 2 : drink === "water" ? 1.5 : 0
    return (basePrice + extraCheesePrice + drinkPrice).toFixed(2)
  }

  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br rounded-4xl ml-12 mr-12 mt-14 from-gray-900 via-black to-gray-800 py-20 md:py-32 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-5 blur-2xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-10 blur-xl"
          animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-5 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative px-4 md:px-8 mx-auto max-w-7xl">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div animate={sparkleAnimation}>
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </motion.div>
            <span className="inline-block text-yellow-400 font-bold mb-3 px-6 py-3 bg-yellow-400/10 backdrop-blur-sm rounded-full text-sm border border-yellow-400/20 shadow-lg">
              🔥 OUR SPECIALTIES
            </span>
            <motion.div animate={sparkleAnimation}>
              <Zap className="h-8 w-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Signature Burgers
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Handcrafted masterpieces that define perfection
            <span className="block text-yellow-400 text-base mt-2">✨ Each bite tells a story ✨</span>
          </motion.p>
        </div>

        {/* Enhanced Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2.5,
              slideShadows: false,
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            centeredSlides={true}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 20 },
              480: { slidesPerView: 2, spaceBetween: 25 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 35 },
            }}
            className="static px-2 md:px-0 !overflow-visible"
          >
            {burgers.map((burger, index) => (
              <SwiperSlide key={burger._id}>
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{
                    scale: 1.08,
                    y: -10,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedBurger(burger)
                    setIsSidebarOpen(true)
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Floating Badge */}
                  <div className="absolute -top-3 -right-3 z-20">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-black px-3 py-1 rounded-full shadow-xl border-2 border-black"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      🔥 HOT
                    </motion.div>
                  </div>

                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-800/80 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500">
                    {/* Enhanced Image Container */}
                    <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                      <img
                        src={burger.image || "/placeholder.svg"}
                        alt={burger.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Heart Icon */}
                      <motion.button
                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-black/70 transition-all z-10"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="h-4 w-4 text-yellow-400 hover:text-yellow-300 transition-colors" />
                      </motion.button>

                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-white font-bold text-sm">{burger.rating}</span>
                      </div>

                      {/* Time Badge */}
                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-white font-medium text-sm">{burger.time} min</span>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-2 group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-300">
                          {burger.name}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors">
                          {burger.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                          ${burger.price.toFixed(2)}
                        </span>
                        <motion.div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Order Now
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced Navigation Buttons */}
          <motion.button
            className="swiper-button-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full z-10 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-yellow-400 hover:text-black -translate-x-8 shadow-2xl border border-yellow-400/20"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(234, 179, 8, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            className="swiper-button-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full z-10 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-yellow-400 hover:text-black translate-x-8 shadow-2xl border border-yellow-400/20"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(234, 179, 8, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Floating Checkout Button */}
      <motion.div
        className="fixed bottom-8 left-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-black px-6 py-4 rounded-2xl shadow-2xl border-2 border-black/20 transition-all duration-300"
            onClick={() => navigate("/checkout")}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Checkout - $
            {cart
              .reduce(
                (total, item) =>
                  total + Number.parseFloat(calculatePrice(item.price, !!item.extraCheese, item.drink || "none")),
                0,
              )
              .toFixed(2)}
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && selectedBurger && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-full sm:w-[600px] bg-gray-900/95 backdrop-blur-xl border-l border-yellow-400/20 shadow-2xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Enhanced Header */}
              <div className="relative p-8 bg-gradient-to-r from-gray-900 to-black border-b border-yellow-400/20">
                <motion.button
                  className="absolute top-6 right-6 p-3 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 transition-all duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>

                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    {selectedBurger.name}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">Customize Your Perfect Order</p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Enhanced Image */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={selectedBurger.image || "/placeholder.svg"}
                    alt={selectedBurger.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-white font-bold text-sm ml-1">{selectedBurger.rating}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Form */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Choose Your Drink
                    </label>
                    <select
                      value={drinkOption}
                      onChange={(e) => setDrinkOption(e.target.value)}
                      className="w-full p-4 rounded-xl bg-gray-800 border border-yellow-400/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all shadow-lg"
                    >
                      <option value="cola">🥤 Cola ($2.50)</option>
                      <option value="lemonade">🍋 Lemonade ($2.00)</option>
                      <option value="water">💧 Water ($1.50)</option>
                      <option value="none">❌ None</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={extraCheese}
                        onChange={(e) => setExtraCheese(e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-yellow-400/50 text-yellow-400 focus:ring-yellow-400/20 bg-gray-700"
                      />
                      <div className="flex-1">
                        <span className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors">
                          🧀 Extra Cheese
                        </span>
                        <span className="block text-gray-400 text-sm">Add premium cheese (+$1.00)</span>
                      </div>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-black py-6 rounded-2xl shadow-2xl border-2 border-black/20 transition-all duration-300 text-lg"
                      onClick={() => handleAddToCart(selectedBurger)}
                    >
                      <Sparkles className="h-5 w-5 mr-3" />
                      Add to Cart - ${calculatePrice(selectedBurger.price, extraCheese, drinkOption)}
                      <Sparkles className="h-5 w-5 ml-3" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
