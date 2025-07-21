import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, UtensilsCrossed, Menu, X, ShoppingCart, Truck, MapPin, CreditCard, DollarSign } from "lucide-react";
import Footer from "@/components/Footer";
import { CartContext } from "@/context/Context";

interface Burger {
  _id: string;
  name: string;
  description: string;
  price: number; // In cents
  image: string;
  popular?: boolean;
  drink?: string;
  extraCheese?: boolean;
  quantity?: number;
  isDeal?: boolean;
  restaurantId?: number;
}

interface Deal {
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  items: string[];
  tag: string;
}

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 25px 50px rgba(234, 179, 8, 0.35)",
  transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
};

export default function Checkout() {
  const { cart, addToCart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isPickup, setIsPickup] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const selectedDeal = location.state?.selectedDeal as Deal | undefined;

  useEffect(() => {
    if (selectedDeal && !cart.some((item) => item._id === `deal-${selectedDeal.title}`)) {
      const dealItem: Burger = {
        _id: `deal-${selectedDeal.title}`,
        name: selectedDeal.title,
        description: selectedDeal.description,
        price: parseFloat(selectedDeal.price.replace("$", "")) * 100 || 0,
        image: selectedDeal.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        quantity: 1,
        isDeal: true,
        restaurantId: 1,
      };
      addToCart(dealItem);
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [selectedDeal, cart, addToCart, navigate, location.pathname]);

  const calculateTotal = () => {
    return (cart.reduce((total, item) => {
      const extraCost =
        (item.extraCheese ? 100 : 0) +
        (item.drink === "cola" ? 250 : item.drink === "lemonade" ? 200 : item.drink === "water" ? 150 : 0);
      return total + (item.price + extraCost) * (item.quantity || 1);
    }, 0) / 100).toFixed(2);
  };

  const validateInputs = () => {
    if (!name.trim()) return "Please provide your name";
    if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber))
      return "Please provide a valid 10-digit phone number";
    if (!isPickup && !address.trim()) return "Please provide your delivery address";
    if (!paymentMethod) return "Please select a payment method";
    return null;
  };

  const handlePlaceOrder = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Cart contents:", cart);

      const payload = {
        name,
        phoneNumber,
        cart: cart.map((item) => {
          const cartItem: any = { quantity: item.quantity || 1 };
          if ('restaurantId' in item && item.restaurantId) cartItem.restaurantId = item.restaurantId;
          return cartItem;
        }),
        deliveryOption: isPickup ? "pickup" : "delivery",
        address: isPickup ? undefined : address,
        paymentMethod,
      };
      console.log("Order payload:", JSON.stringify(payload, null, 2));

      // Simulate payment processing
      const simulatedPaymentResponse = {
        ok: true,
        json: () =>
          Promise.resolve({
            payment: {
              id: `payment-${Date.now()}`,
              method: paymentMethod,
              status: "success",
              amount: calculateTotal(),
            },
            order: {
              id: `order-${Date.now()}`,
              name,
              phoneNumber,
              items: payload.cart,
              total: calculateTotal(),
              status: "success",
            },
          }),
      };

      if (!simulatedPaymentResponse.ok) {
        const errorData = await simulatedPaymentResponse.json();
        console.log("Simulated payment error:", errorData);
        throw new Error("Payment failed");
      }
      const data = await simulatedPaymentResponse.json();
      console.log("Payment and order saved:", data);
      clearCart();
      navigate("/order-confirmation", { state: { order: data.order, payment: data.payment } });
    } catch (err) {
      setError((err as Error).message || "Failed to place order or process payment");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = (burgerId: string) => {
    const item = cart.find((i) => i._id === burgerId);
    if (item) removeFromCart(burgerId, item.drink, item.extraCheese);
  };

  const paymentOptions = [
    { id: "credit_card", label: "Credit/Debit Card (International)", icon: CreditCard },
    { id: "paypal", label: "PayPal (International)", icon: DollarSign },
    { id: "jazzcash", label: "JazzCash (Pakistan)", icon: DollarSign },
    { id: "easypaisa", label: "EasyPaisa (Pakistan)", icon: DollarSign },
    { id: "bank_card_pk", label: "Bank Card (Pakistan)", icon: CreditCard },
  ];

  return (
    <motion.div
      className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-zinc-800 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[150px] opacity-[0.08] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[150px] opacity-[0.08] animate-pulse" />

      <motion.header
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-2xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <UtensilsCrossed className="h-6 w-6 text-yellow-500 group-hover:rotate-12 transition-all duration-500" />
              <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full transform group-hover:scale-[2.5] transition-transform duration-500" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent bg-[length:200%_auto] hover:bg-[center_right_1rem] transition-all duration-500">
              BurgerBite
            </span>
          </Link>

          <div className="hidden md:flex items-center bg-zinc-800/30 backdrop-blur-lg rounded-full p-1.5 border border-white/5 shadow-lg">
            <motion.button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                !isPickup ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg" : "text-yellow-500 hover:bg-white/5"
              }`}
              onClick={() => setIsPickup(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Truck className="h-4 w-4" />
              Delivery
            </motion.button>
            <motion.button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isPickup ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg" : "text-yellow-500 hover:bg-white/5"
              }`}
              onClick={() => setIsPickup(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="h-4 w-4" />
              Pickup
            </motion.button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="secondary"
              className="bg-yellow-500 text-black hover:bg-yellow-400 border-2 border-yellow-600 hover:border-yellow-500 p-2 rounded-full"
              onClick={() => navigate("/")}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-1">{cart.length}</span>
            </Button>
            <button
              className="text-orange-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <motion.div whileHover={buttonHover}>
              <Button
                className="bg-yellow-500 text-black hover:bg-yellow-400 border-2 border-yellow-600 hover:border-yellow-500 p-2 px-4 rounded-full"
                onClick={() => navigate("/")}
              >
                Back to Menu
              </Button>
            </motion.div>
          </nav>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-black/95 p-4 fixed top-16 left-0 right-0 z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-center bg-zinc-800 rounded-full p-1 mb-4">
                  <motion.button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !isPickup ? "bg-yellow-500 text-black" : "text-yellow-500 hover:bg-zinc-700"
                    }`}
                    onClick={() => setIsPickup(false)}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Delivery
                  </motion.button>
                  <motion.button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isPickup ? "bg-yellow-500 text-black" : "text-yellow-500 hover:bg-zinc-700"
                    }`}
                    onClick={() => setIsPickup(true)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Pickup
                  </motion.button>
                </div>
                <nav className="flex flex-col gap-4 items-center">
                  <Button
                    className="bg-yellow-500 text-black hover:bg-yellow-400 border-2 border-yellow-600 hover:border-yellow-500 p-2 px-4 rounded-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/");
                    }}
                  >
                    Back to Menu
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 sm:py-20 max-w-7xl relative z-10">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center tracking-tight px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient relative">
            Checkout
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0"></span>
          </span>
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            className="max-w-md mx-auto text-center p-12 rounded-3xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative inline-block mb-8">
              <ShoppingCart className="h-24 w-24 text-yellow-500" />
              <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full animate-pulse" />
            </div>
            <p className="text-3xl text-gray-300 mb-10 font-medium">Your cart is empty</p>
            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 px-12 py-6 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-yellow-500/25 transition-all duration-500"
                onClick={() => navigate("/")}
              >
                Browse Menu
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <Card className="bg-gradient-to-b from-zinc-800/30 to-zinc-900/30 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl hover:border-yellow-500/20 transition-colors duration-500">
                <CardHeader className="border-b border-white/10 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      className="group relative flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-yellow-500/30 transition-all duration-500"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg sm:rounded-xl overflow-hidden ring-1 ring-yellow-500/20 group-hover:ring-yellow-500/40 transition-all duration-500">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                            {item.name}
                          </h3>
                          <p className="text-zinc-400 text-lg mt-2">
                            ${(item.price / 100 + (item.extraCheese ? 1 : 0) + (item.drink === "cola" ? 2.5 : item.drink === "lemonade" ? 2 : item.drink === "water" ? 1.5 : 0)).toFixed(
                              2
                            )}
                            {item.drink && `, ${item.drink}`}
                            {item.extraCheese && ", Extra Cheese"}
                            {item.isDeal && " (Deal)"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 1;
                            updateQuantity(item._id, newQuantity, item.drink, item.extraCheese);
                          }}
                          min="1"
                          className="w-16 p-1 rounded bg-white/[0.03] border border-white/10 text-white text-center"
                        />
                        <motion.button
                          className="text-red-400 hover:text-red-300 p-4 rounded-full hover:bg-red-500/10 transition-all duration-300"
                          onClick={() => handleRemoveFromCart(item._id)}
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="h-6 w-6" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-yellow-500/5 border border-yellow-500/20 backdrop-blur-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg text-gray-300 font-medium">Total Amount</span>
                      <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                        ${calculateTotal()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <Card className="bg-gradient-to-b from-zinc-800/30 to-zinc-900/30 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl hover:border-yellow-500/20 transition-colors duration-500">
                <CardHeader className="border-b border-white/10 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                    Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="space-y-2">
                    <label className="text-yellow-500 font-medium block text-sm sm:text-base">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-yellow-500 font-medium block text-sm sm:text-base">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-xl"
                    />
                  </div>
                  <div className="p-1.5 sm:p-2 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Button
                        className={`flex-1 py-3 sm:py-5 rounded-lg sm:rounded-xl font-medium sm:font-semibold transition-all duration-500 text-base sm:text-lg ${
                          !isPickup ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg" : "bg-transparent text-yellow-500 hover:bg-white/5"
                        }`}
                        onClick={() => setIsPickup(false)}
                      >
                        <Truck className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                        Delivery
                      </Button>
                      <Button
                        className={`flex-1 py-3 sm:py-5 rounded-lg sm:rounded-xl font-medium sm:font-semibold transition-all duration-500 text-base sm:text-lg ${
                          isPickup ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg" : "bg-transparent text-yellow-500 hover:bg-white/5"
                        }`}
                        onClick={() => setIsPickup(true)}
                      >
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                        Pickup
                      </Button>
                    </div>
                  </div>
                  {!isPickup && (
                    <div className="space-y-2">
                      <label className="text-yellow-500 font-medium block text-sm sm:text-base">Delivery Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                        className="w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-xl"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-yellow-500 font-medium block text-sm sm:text-base">Payment Method</label>
                    {paymentOptions.map((option) => (
                      <label key={option.id} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-lg hover:border-yellow-500/30 transition-all duration-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={option.id}
                          checked={paymentMethod === option.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-yellow-500 focus:ring-yellow-500"
                        />
                        <option.icon className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm sm:text-base text-white">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {error && (
                    <motion.div
                      className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-red-400 text-lg">{error}</p>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black hover:from-yellow-400 hover:via-orange-400 hover:to-yellow-400 p-3 sm:p-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 disabled:opacity-50 relative overflow-hidden group"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                          <span className="relative">
                            Processing
                            <span className="animate-pulse">...</span>
                          </span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-3 group-hover:scale-105 transition-transform duration-500">
                          Place Order
                          <motion.div
                            className="w-6 h-6 rounded-full bg-black/20"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.div>
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-white/10 to-yellow-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </motion.div>
  );
}