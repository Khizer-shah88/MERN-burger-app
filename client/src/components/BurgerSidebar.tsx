// "use client"

// import type React from "react"
// import { useState, useContext } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { X, Sparkles, Star } from "lucide-react" // Added Sparkles and Star
// import { Button } from "@/components/ui/button"
// import { CartContext } from "@/context/Context"

// interface Restaurant {
//   _id: string
//   name: string
//   description: string
//   image: string
//   price: number
//   popular: boolean
// }

// interface BurgerSidebarProps {
//   selectedBurger: Restaurant | null
//   isSidebarOpen: boolean
//   setIsSidebarOpen: (isOpen: boolean) => void
// }

// const BurgerSidebar: React.FC<BurgerSidebarProps> = ({ selectedBurger, isSidebarOpen, setIsSidebarOpen }) => {
//   const { addToCart } = useContext(CartContext)
//   const [drink, setDrink] = useState<string | undefined>(undefined)
//   const [extraCheese, setExtraCheese] = useState<boolean>(false)

//   const calculatePrice = (price: number, extraCheese: boolean, drink: string | undefined): string => {
//     const basePrice = price
//     const extraCheesePrice = extraCheese ? 1 : 0 // Assuming $1 for extra cheese
//     const drinkPrice = drink === "cola" ? 2.5 : drink === "lemonade" ? 2 : drink === "water" ? 1.5 : 0
//     return (basePrice + extraCheesePrice + drinkPrice).toFixed(2)
//   }

//   const handleAddToCart = () => {
//     if (!selectedBurger) return

//     const burger = {
//       _id: selectedBurger._id,
//       name: selectedBurger.name,
//       description: selectedBurger.description,
//       image: selectedBurger.image,
//       price: selectedBurger.price,
//       popular: selectedBurger.popular,
//       quantity: 1,
//       isDeal: false, // Assuming this is not a deal
//       drink,
//       extraCheese,
//     }
//     console.log("Adding customized burger to cart:", burger)
//     addToCart(burger)
//     setIsSidebarOpen(false)
//     setDrink(undefined)
//     setExtraCheese(false)
//   }

//   const sparkleAnimation = {
//     scale: [1, 1.2, 1],
//     rotate: [0, 180, 360],
//     transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
//   }

//   const buttonHover = {
//     scale: 1.05,
//     boxShadow: "0 25px 50px rgba(234, 179, 8, 0.4)",
//     transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
//   }

//   return (
//     <AnimatePresence>
//       {isSidebarOpen && selectedBurger && (
//         <motion.div
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
//         >
//           {/* Floating Background Elements */}
//           <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             <motion.div
//               className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-10 blur-xl"
//               animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
//               transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//             />
//             <motion.div
//               className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-15 blur-xl"
//               animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
//               transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//             />
//           </div>

//           <motion.div
//             className="absolute right-0 top-0 h-full w-full sm:w-[90vw] max-w-[500px] bg-gray-900/95 backdrop-blur-xl border-l border-yellow-400/20 shadow-2xl overflow-y-auto"
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//           >
//             {/* Enhanced Header */}
//             <div className="relative p-6 border-b border-yellow-400/20 bg-gradient-to-r from-gray-900 to-black">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//                     {selectedBurger.name}
//                   </h2>
//                   <p className="text-gray-400 text-sm mt-1">Customize Your Order</p>
//                 </div>
//                 <motion.button
//                   className="p-2 hover:bg-yellow-400/20 rounded-xl transition-colors"
//                   onClick={() => setIsSidebarOpen(false)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <X className="h-6 w-6 text-yellow-400" />
//                 </motion.button>
//               </div>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Enhanced Image */}
//               <motion.div
//                 className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-700 to-gray-800"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <img
//                   src={selectedBurger.image || "/placeholder.svg"}
//                   alt={selectedBurger.name}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     ;(e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                 <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                   ))}
//                   <span className="text-white font-bold text-sm">4.8</span>
//                 </div>
//               </motion.div>

//               <p className="text-gray-300 text-base leading-relaxed">{selectedBurger.description}</p>

//               {/* Drink Option */}
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
//                 <label
//                   htmlFor="drink-select"
//                   className="block text-yellow-400 font-semibold mb-3 flex items-center gap-2"
//                 >
//                   <Sparkles className="h-4 w-4" />
//                   Choose Your Drink
//                 </label>
//                 <select
//                   id="drink-select"
//                   className="w-full p-4 rounded-xl bg-gray-800 border border-yellow-400/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all shadow-lg"
//                   value={drink || ""}
//                   onChange={(e) => setDrink(e.target.value || undefined)}
//                 >
//                   <option value="">❌ No Drink</option>
//                   <option value="cola">🥤 Cola (+$2.50)</option>
//                   <option value="lemonade">🍋 Lemonade (+$2.00)</option>
//                   <option value="water">💧 Bottled Water (+$1.50)</option>
//                 </select>
//               </motion.div>

//               {/* Extra Cheese Option */}
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//                 <label className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={extraCheese}
//                     onChange={(e) => setExtraCheese(e.target.checked)}
//                     className="w-5 h-5 rounded border-2 border-yellow-400/50 text-yellow-400 focus:ring-yellow-400/20 bg-gray-700"
//                   />
//                   <div className="flex-1">
//                     <span className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors">
//                       🧀 Extra Cheese
//                     </span>
//                     <span className="block text-gray-400 text-sm">Add premium cheese (+$1.00)</span>
//                   </div>
//                 </label>
//               </motion.div>

//               {/* Add to Cart Button */}
//               <motion.div
//                 whileHover={buttonHover}
//                 whileTap={{ scale: 0.98 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <Button
//                   className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-black py-6 rounded-2xl shadow-2xl border-2 border-black/20 transition-all duration-300 text-lg"
//                   onClick={handleAddToCart}
//                 >
//                   <Sparkles className="h-5 w-5 mr-3" />
//                   Add to Cart - ${calculatePrice(selectedBurger.price, extraCheese, drink)}
//                   <Sparkles className="h-5 w-5 ml-3" />
//                 </Button>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default BurgerSidebar
