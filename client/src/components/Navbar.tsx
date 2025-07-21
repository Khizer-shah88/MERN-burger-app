"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UtensilsCrossed, Truck, MapPin, ShoppingCart, Menu, X, Sparkles, Star } from "lucide-react"
import { Button } from "./ui/button"

const Navbar = () => {
  const [isPickup, setIsPickup] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [cart, setCart] = useState([]) // Assuming cart is an array of items

  const handleViewCart = () => {
    // Implement view cart functionality
  }

  // Smooth scroll to the "popular burger" section
  const handleOrderNow = () => {
    // Try to find an element with id "popular-burgers" or "popular-burger"
    const el = document.getElementById("popular-burgers") || document.getElementById("popular-burger")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      // fallback: scroll to #menu if exists
      const menuEl = document.getElementById("menu")
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const buttonHover = {
    scale: 1.03,
    boxShadow: "0 8px 20px rgba(234, 179, 8, 0.25)",
    transition: { duration: 0.4 },
  }

  const sparkleAnimation = {
    scale: [1, 1.15, 1],
    rotate: [0, 180, 360],
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  }

  return (
    <>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-10 left-20 w-28 h-28 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-4 blur-2xl"
          animate={{ y: [0, -15, 0], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-32 w-20 h-20 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-8 blur-xl"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <motion.header
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-6xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Main Navbar Container */}
        <div className="bg-black/80 backdrop-blur-2xl border border-yellow-400/20 rounded-2xl shadow-2xl shadow-black/50">
          <div className="flex h-16 items-center justify-between px-5 lg:px-6">
            {/* Logo Section */}
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, duration: 0.4 }}
            >
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2.5 rounded-xl shadow-lg"
                  animate={sparkleAnimation}
                >
                  <UtensilsCrossed className="h-5 w-5 text-black" />
                </motion.div>
                <div className="absolute -top-0.5 -right-0.5">
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  BurgerBite
                </span>
                <div className="flex items-center gap-0.5 -mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-1.5 w-1.5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">Premium</span>
                </div>
              </div>
            </motion.div>

            {/* Center Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              {["Menu", "How It Works", "Reviews"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="relative text-gray-300 hover:text-yellow-400 font-medium transition-colors duration-400 group text-sm"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-400" />
                </motion.a>
              ))}
            </nav>

            {/* Delivery/Pickup Toggle - Center */}
            <div className="hidden md:flex items-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-yellow-400/20">
              <motion.button
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-400 ${
                  !isPickup
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg"
                    : "text-yellow-400 hover:bg-gray-700/50"
                }`}
                onClick={() => setIsPickup(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" />
                  Delivery
                </div>
              </motion.button>
              <motion.button
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-400 ${
                  isPickup
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg"
                    : "text-yellow-400 hover:bg-gray-700/50"
                }`}
                onClick={() => setIsPickup(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Pickup
                </div>
              </motion.button>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2.5">
                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.97 }}>
                  <Button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold px-4 py-2 rounded-xl shadow-lg border-2 border-black/20 transition-all duration-400 text-sm"
                    onClick={handleOrderNow}
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Order Now
                  </Button>
                </motion.div>

                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.97 }}>
                  <Button
                    className="bg-gray-800/80 backdrop-blur-sm text-yellow-400 hover:bg-gray-700/80 font-bold px-4 py-2 rounded-xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-400 relative text-sm"
                    onClick={handleViewCart}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                    Cart
                    {cart.length > 0 && (
                      <motion.span
                        className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, duration: 0.5 }}
                      >
                        {cart.length}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center gap-2.5 lg:hidden">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <Button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 p-2.5 rounded-xl shadow-lg relative"
                    onClick={handleViewCart}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-yellow-400 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </motion.div>

                <motion.button
                  className="text-yellow-400 hover:text-yellow-300 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-400"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden mt-3 bg-black/90 backdrop-blur-2xl border border-yellow-400/20 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="p-5">
                {/* Mobile Delivery/Pickup Toggle */}
                <div className="flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 mb-5 border border-yellow-400/20">
                  <motion.button
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-400 flex-1 ${
                      !isPickup
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg"
                        : "text-yellow-400 hover:bg-gray-700/50"
                    }`}
                    onClick={() => setIsPickup(false)}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Truck className="h-3.5 w-3.5" />
                      Delivery
                    </div>
                  </motion.button>
                  <motion.button
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-400 flex-1 ${
                      isPickup
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg"
                        : "text-yellow-400 hover:bg-gray-700/50"
                    }`}
                    onClick={() => setIsPickup(true)}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      Pickup
                    </div>
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-3 items-center mb-5">
                  {["Menu", "How It Works", "Reviews"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-300 hover:text-yellow-400 font-medium transition-colors duration-400"
                      whileHover={{ scale: 1.03, x: 8 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.4 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Action Button */}
                <motion.div
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Button
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold py-3 rounded-xl shadow-lg border-2 border-black/20 transition-all duration-400"
                    onClick={() => {
                      setIsMenuOpen(false)
                      // Smooth scroll to popular burger section
                      setTimeout(() => {
                        handleOrderNow()
                      }, 100) // wait for menu to close
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Order Now
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Navbar
