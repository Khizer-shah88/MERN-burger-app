"use client"

import type React from "react"
import { motion } from "framer-motion"
import { DollarSign, Clock } from "lucide-react"
import { Card, CardTitle, CardDescription } from "./ui/card"

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
}

interface Offer {
  title: string
  description: string
  icon: React.ElementType
  animation: {
    rotate?: number[]
    scale?: number[]
    transition?: {
      duration?: number
      repeat?: number | "Infinity"
      ease?: string
    }
  }
}

interface OffersProps {
  navigate: (path: string) => void
  onSelectDeal: (deal: Offer) => void // Add callback to handle deal selection
}

const Offers: React.FC<OffersProps> = ({ navigate, onSelectDeal }) => {
  const offers: Offer[] = [
    {
      title: "Student Special",
      description: "20% off on all orders with valid student ID",
      icon: DollarSign,
      animation: {
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      },
    },
    {
      title: "30 Min Delivery",
      description: "Or your next order is free",
      icon: Clock,
      animation: {
        rotate: [0, 360],
        transition: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      },
    },
  ]

  return (
    <motion.section
      className="bg-zinc-900/50 py-12 sm:py-16 md:py-28 rounded-3xl sm:rounded-[3rem] mx-4 sm:mx-auto max-w-6xl relative overflow-hidden"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="text-center mb-12 sm:mb-16 px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Exclusive <span className="text-yellow-400 drop-shadow-lg">Offers</span>
        </h2>
        <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
          Irresistible deals crafted just for you. Don't miss out on our limited-time specials!
        </p>
      </motion.div>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.85 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    duration: 0.9,
                    delay: index * 0.2 + 0.3,
                    bounce: 0.3,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px rgba(252, 211, 77, 0.2)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onSelectDeal(offer) // Call the callback with the selected deal
                navigate("/deals") // Navigate to deals page
              }}
              className="cursor-pointer relative group"
            >
              <Card
                className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8
                           bg-gradient-to-br from-yellow-500 to-yellow-400
                           border-4 border-yellow-300
                           shadow-xl shadow-yellow-900/30
                           transition-all duration-300 ease-in-out
                           rounded-2xl overflow-hidden
                           relative"
              >
                <motion.div
                  className="rounded-full bg-white/95 p-5 ring-4 ring-yellow-600/50 flex-shrink-0"
                  animate={{
                    ...offer.animation,
                    transition: {
                      duration: offer.animation?.transition?.duration,
                      repeat:
                        offer.animation?.transition?.repeat === "Infinity"
                          ? Number.POSITIVE_INFINITY
                          : offer.animation?.transition?.repeat,
                      ease: offer.animation?.transition?.ease,
                    },
                  }}
                >
                  <offer.icon className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-700" />
                </motion.div>
                <div className="text-center sm:text-left flex-1">
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-2 leading-tight">
                    {offer.title}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg text-gray-700">{offer.description}</CardDescription>
                </div>
                <motion.div
                  className="absolute bottom-4 right-4 text-zinc-800 text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  →
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Offers // Ensure this matches the component name