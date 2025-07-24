"use client"
import { useState, useEffect, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { X, ShoppingCart, Trash2 } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import SimpleBurgerSlider from "@/components/simple-burger-slider"
import BurgerMenu from "@/components/burger-menu"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import PopularBurger from "@/components/PopularBurger"
import Works from "@/components/Works"
import Offers from "@/components/Offers"
import AppLoad from "@/components/AppLoad"
import Footer from "@/components/Footer"
import { CartContext } from "@/context/Context"

interface Restaurant {
  _id: string
  name: string
  description: string
  price: number
  image: string
  popular: boolean
  drink?: string
  extraCheese?: boolean
  quantity?: number
  isDeal?: boolean
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 350, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.3 } },
}

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
}

export default function Landing() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedBurger, setSelectedBurger] = useState<Restaurant | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [drinkOption, setDrinkOption] = useState<string>("cola")
  const [extraCheese, setExtraCheese] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Fetch restaurants from backend
 // In LandingPage.tsx, inside the component
useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log('Fetching restaurants from https://mern-burger-app.onrender.com/api/restaurants');
        const response = await fetch("https://mern-burger-app.onrender.com/api/restaurants", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Raw fetched data:', JSON.stringify(data, null, 2));
        if (!Array.isArray(data)) {
          throw new Error('Response is not an array');
        }
        const normalizedData = data.map((item: any) => ({
          ...item,
          _id: item._id.toString(),
          popular: item.popular ?? false,
          price: Number(item.price),
        }));
        console.log("Normalized fetched restaurants:", JSON.stringify(normalizedData, null, 2));
        setRestaurants(normalizedData);
        setLoading(false);
      } catch (err: any) {
        console.error('Fetch error:', err.message);
        setError(`Failed to fetch restaurants: ${err.message}`);
        setLoading(false);
        setRestaurants([]); // Avoid outdated fallback data
      }
    };
    fetchRestaurants();
  }, []);

  

  

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  // Handle adding burger to cart
  const handleAddToCart = (burger: Restaurant) => {
    console.log("Selected burger before adding to cart:", burger);
    const cartItem: Restaurant = {
      ...burger,
      _id: burger._id,
      drink: drinkOption === "none" ? undefined : drinkOption,
      extraCheese,
      quantity: 1,
      isDeal: false,
    };
    console.log("Adding to cart:", cartItem);
    addToCart(cartItem);
    setIsSidebarOpen(false);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setDrinkOption("cola");
    setExtraCheese(false);
    setSelectedBurger(null);
  };

  // Handle view cart
  const handleViewCart = () => {
    setSelectedBurger(null);
    setIsSidebarOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <Skeleton className="h-16 w-full mb-4" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-yellow-500 text-black hover:bg-yellow-400">
          Retry
        </Button>
      </div>
    );
  }

  // ... rest of the JSX unchanged (sidebar, Hero, PopularBurger, etc.)
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <header>
        <Navbar />
      </header>
      <motion.div
        className="fixed bottom-[70%] right-18 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          className="bg-yellow-500 text-black hover:bg-yellow-400 border-2 border-yellow-600 hover:border-yellow-500 p-2 rounded-full"
          onClick={handleViewCart}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="ml-2">{cart.length}</span>
        </Button>
      </motion.div>
      <main>
        <section>
          <Hero setIsSidebarOpen={setIsSidebarOpen} navigate={navigate} />
        </section>
        <section>
          <SimpleBurgerSlider />
        </section>
        <section>
          <PopularBurger
            restaurants={restaurants}
            setSelectedBurger={(burger) => {
              console.log("Setting selected burger:", burger);
              setSelectedBurger(burger);
            }}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </section>
        <section className="m-12">
          <BurgerMenu />
        </section>
        <section>
          <Works navigate={navigate} />
        </section>
        <section>
          <Offers navigate={navigate} onSelectDeal={() => {}} />
        </section>
        <section>
          <AppLoad navigate={navigate} />
        </section>
        <footer>
          <Footer />
        </footer>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            >
              <motion.div
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-0 h-full w-full max-w-[500px] bg-black/90 backdrop-blur-2xl border-l border-yellow-600/20 p-6 sm:p-8 shadow-[0_0_30px_#facc15]/10 rounded-l-2xl overflow-y-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-yellow-500/10 hover:bg-yellow-400/20 text-yellow-400 transition-all duration-200 ring-1 ring-yellow-400 z-10"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                {selectedBurger ? (
                  <div className="flex-1 flex flex-col space-y-10 pt-16">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-center">
                      <h2 className="text-3xl font-extrabold text-yellow-400">{selectedBurger.name}</h2>
                      <p className="text-white/70 mt-1 text-sm">Customize your order</p>
                    </motion.div>
                    <motion.img
                      src={selectedBurger.image}
                      alt={selectedBurger.name}
                      className="w-full h-64 object-cover rounded-xl border border-yellow-600/30 shadow-yellow-500/10 shadow-lg"
                      onError={(e: any) => (e.target.src = "/placeholder.svg?height=400&width=400")}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                    <motion.div className="space-y-6 flex-1" initial="hidden" animate="visible">
                      <motion.div variants={fadeUp} custom={2}>
                        <label htmlFor="drink-option" className="text-yellow-300 text-sm font-semibold mb-2 block">
                          Select a Drink
                        </label>
                        <div className="relative">
                          <select
                            id="drink-option"
                            value={drinkOption}
                            onChange={(e) => setDrinkOption(e.target.value)}
                            className="appearance-none w-full px-4 py-3 rounded-xl bg-zinc-900 border border-yellow-700 text-yellow-100 text-base focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all"
                          >
                            <option value="cola">Cola ($2.50)</option>
                            <option value="lemonade">Lemonade ($2.00)</option>
                            <option value="water">Water ($1.50)</option>
                            <option value="none">None</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-yellow-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.25 7.25l4.5 4.5 4.5-4.5" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div variants={fadeUp} custom={3} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={extraCheese}
                          onChange={(e) => setExtraCheese(e.target.checked)}
                          className="h-5 w-5 rounded border-yellow-600 text-yellow-400 bg-zinc-800 focus:ring-yellow-500"
                        />
                        <span className="text-yellow-300 text-sm font-medium">Extra Cheese (+$1.00)</span>
                      </motion.div>
                      <motion.div variants={fadeUp} custom={4}>
                        <Button
                          className="w-full bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-600 py-3 rounded-xl font-bold shadow-md transition-all duration-300"
                          onClick={() => handleAddToCart(selectedBurger)}
                        >
                          Add to Cart – $
                          {(
                            selectedBurger.price / 100 +
                            (extraCheese ? 1 : 0) +
                            (drinkOption === "cola"
                              ? 2.5
                              : drinkOption === "lemonade"
                                ? 2
                                : drinkOption === "water"
                                  ? 1.5
                                  : 0)
                          ).toFixed(2)}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div className="flex-1 flex flex-col space-y-8 pt-14" initial="hidden" animate="visible">
                    <motion.div className="text-center" variants={fadeUp} custom={1}>
                      <h2 className="text-3xl font-extrabold text-yellow-400">Your Cart</h2>
                      <p className="text-yellow-200/70 mt-1 text-sm">{cart.length} items</p>
                    </motion.div>
                    {cart.length === 0 ? (
                      <motion.p
                        variants={fadeUp}
                        custom={2}
                        className="text-center text-white/50 text-base mt-10 flex-1 flex items-center justify-center"
                      >
                        Your cart is empty.
                      </motion.p>
                    ) : (
                      <>
                        <motion.div
                          className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar"
                          variants={fadeUp}
                          custom={3}
                        >
                          {cart.map((item, i) => (
                            <motion.div
                              key={`${item._id}-${item.drink}-${item.extraCheese}`}
                              className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-yellow-700 shadow-sm hover:bg-zinc-800 transition"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-14 h-14 object-cover rounded-lg border border-yellow-800"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg?height=64&width=64"
                                  }}
                                />
                                <div>
                                  <h3 className="text-yellow-300 font-semibold text-sm">{item.name}</h3>
                                  <p className="text-yellow-100/70 text-xs mt-1">
                                    $
                                    {(
                                      item.price / 100 +
                                      (item.extraCheese ? 1 : 0) +
                                      (item.drink === "cola"
                                        ? 2.5
                                        : item.drink === "lemonade"
                                          ? 2
                                          : item.drink === "water"
                                            ? 1.5
                                            : 0)
                                    ).toFixed(2)}{" "}
                                    {item.drink && `, ${item.drink}`} {item.extraCheese && ", Extra Cheese"}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10"
                                onClick={() => removeFromCart(item._id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </motion.div>
                        <motion.div variants={fadeUp} custom={5}>
                          <Button
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-600 py-3 rounded-xl font-bold shadow-lg transition-all duration-300"
                            onClick={() => navigate("/checkout")}
                          >
                            Proceed to Checkout – $
                            {cart
                              .reduce(
                                (total, item) =>
                                  total +
                                  (item.price / 100 +
                                    (item.extraCheese ? 1 : 0) +
                                    (item.drink === "cola"
                                      ? 2.5
                                      : item.drink === "lemonade"
                                        ? 2
                                        : item.drink === "water"
                                          ? 1.5
                                          : 0)),
                                0,
                              )
                              .toFixed(2)}
                          </Button>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}