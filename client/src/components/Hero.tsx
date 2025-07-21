"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  PlayCircle,
  Star,
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "./ui/button";

// Animation variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)",
  transition: { duration: 0.3, ease: "easeOut" },
};

const sparkleAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, 180, 360],
  transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
};

interface HeroProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setIsSidebarOpen, navigate }) => {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Gradient Circles */}
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

      {/* Content Container */}
      <div className="container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl">
        <motion.div
          className="flex flex-col gap-8 text-center lg:text-left w-full lg:w-1/2"
          variants={slideIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <motion.div animate={sparkleAnimation}>
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
            <div className="bg-yellow-400/10 backdrop-blur-sm text-yellow-400 border border-yellow-400/30 px-4 py-2 rounded-full font-semibold shadow-lg">
              🚀 Free delivery on orders over $30
            </div>
            <motion.div animate={sparkleAnimation}>
              <Zap className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Delicious
            </span>
            <br />
            <span className="text-white">Burgers</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed font-medium">
            Juicy, handcrafted burgers delivered straight to your door in <span className="text-yellow-400 font-bold">30 minutes</span> or less.
            <span className="block text-sm text-gray-400 mt-2">✨ Made with premium ingredients ✨</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 border-2 border-black/20 font-black px-8 py-4 rounded-2xl shadow-2xl text-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MapPin className="h-5 w-5 mr-2" /> Start Your Order <Sparkles className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 backdrop-blur-sm rounded-2xl px-8 py-4 font-bold text-lg"
                onClick={() => navigate("/#how-it-works")}
              >
                <PlayCircle className="h-5 w-5 mr-2" /> How It Works
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="w-full max-w-xs sm:max-w-md md:max-w-lg h-auto rounded-xl overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }}
          transition={{
            y: { duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
            rotate: { duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          }}
        >
          <img
            alt="Delicious burger"
            className="w-full h-full object-cover relative bottom-8"
            src="/images/burger.jpg.png"
            onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'}
          />
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap sm:flex-nowrap items-center gap-6 bg-gray-900/80 backdrop-blur-xl px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border border-yellow-400/20 shadow-2xl text-sm sm:text-base"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-black text-yellow-400">50K+</div>
          <div className="text-gray-400">Happy Customers</div>
        </div>
        <div className="hidden sm:block w-px h-8 bg-yellow-400/30" />
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-black text-yellow-400">30min</div>
          <div className="text-gray-400">Avg Delivery</div>
        </div>
        <div className="hidden sm:block w-px h-8 bg-yellow-400/30" />
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-black text-yellow-400">4.8★</div>
          <div className="text-gray-400">Rating</div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;




//  <motion.div
//           className="w-full max-w-[500px] h-[300px] sm:h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-lg"
//           whileHover={{ scale: 1.05 }}
//           animate={{
//             y: [0, -20, 0], // Floating effect
//             rotate: [0, 3, -3, 0], // Slight tilt effect
//           }}
//           transition={{
//             y: {
//               duration: 4, // Slower floating effect
//               repeat: Infinity,
//               repeatType: 'mirror',
//               ease: 'easeInOut',
//             },
//             rotate: {
//               duration: 5, // Slower tilt effect
//               repeat: Infinity,
//               repeatType: 'mirror',
//               ease: 'easeInOut',
//             },
//           }}
//         >
//           <img
//             alt="Delicious burger"
//             className="w-full h-full object-cover rounded-lg"
//             src="/public/images/burger.jpg.png"
//             onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//         </motion.div>