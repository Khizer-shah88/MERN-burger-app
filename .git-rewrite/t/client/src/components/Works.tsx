import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, UtensilsCrossed, Truck } from 'lucide-react'; // Assuming you're using lucide-react for icons

// Define variants for animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface WorksProps {
  navigate: (path: string) => void;
}

const Works: React.FC<WorksProps> = ({ navigate }) => {
  const steps: Step[] = [
    {
      icon: MapPin,
      title: 'Choose Location',
      description: 'Enter your address to find the nearest BurgerBite location',
    },
    {
      icon: UtensilsCrossed,
      title: 'Pick Your Meal',
      description: 'Browse our menu and select your favorite burgers',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Your order will be delivered in 30 minutes or less',
    },
  ];

  return (
    <motion.section id="how-it-works" className="container py-12 px-4 mx-auto" variants={fadeIn}>
      <div className="flex flex-col items-center gap-4 text-center mb-12">
        <h2 className="text-4xl text-yellow-500 font-bold">How It Works</h2>
        <p className="text-lg max-w-[800px]">Getting your favorite burger is as easy as 1-2-3</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.8 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  duration: 0.8,
                  delay: index * 0.2,
                  bounce: 0.4,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: [1, 1.02], transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(step.title.toLowerCase().replace(' ', '-') === 'choose-location' ? '/location' : '#')}
            className="w-full cursor-pointer"
          >
            <motion.div
              className="flex flex-col items-center text-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-black/20 hover:bg-black/30 transition-colors h-full"
              whileHover={{
                boxShadow: '0px 0px 20px rgba(255, 204, 0, 0.3)',
              }}
            >
              <motion.div
                className="rounded-full bg-primary/20 p-3 sm:p-4 ring-1 ring-primary/40"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: index,
                }}
              >
                <step.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
              </motion.div>
              <motion.h3
                className="text-base sm:text-lg md:text-xl font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                className="text-white text-xs sm:text-sm md:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Works;