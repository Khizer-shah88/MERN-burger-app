import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, UtensilsCrossed, Truck } from 'lucide-react';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  step: number;
  gradient: string;
}

interface WorksProps {
  navigate: (path: string) => void;
}

const Works: React.FC<WorksProps> = ({ navigate }) => {
  const steps: Step[] = [
    {
      step: 1,
      icon: MapPin,
      title: 'Choose Location',
      description: 'Enter your address to find the nearest BurgerBite location near you.',
      gradient: 'from-yellow-400 to-yellow-500',
    },
    {
      step: 2,
      icon: UtensilsCrossed,
      title: 'Pick Your Meal',
      description: 'Browse our mouth-watering menu and pick your favorite burgers.',
      gradient: 'from-orange-400 to-orange-500',
    },
    {
      step: 3,
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Sit back and relax — your order arrives in 30 minutes or less.',
      gradient: 'from-yellow-500 to-orange-400',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-yellow-400/20 mb-4 tracking-widest uppercase">
            Simple Steps
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Getting your favorite burger is as easy as 1-2-3
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connector line – desktop */}
          <div className="hidden md:block absolute top-[4.5rem] left-[calc(33.33%+2rem)] right-[calc(33.33%+2rem)] h-px bg-gradient-to-r from-yellow-400/20 via-yellow-400/60 to-yellow-400/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative group"
            >
              <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-gray-900/60 border border-white/10 group-hover:border-yellow-400/40 transition-all duration-300 backdrop-blur-sm">
                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/5 group-hover:to-orange-400/5 transition-all duration-300" />

                {/* Step badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black text-xs font-black shadow-lg shadow-yellow-400/30 z-10">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`relative z-10 inline-flex p-4 rounded-xl bg-gradient-to-r ${step.gradient} mb-5 shadow-lg`}>
                  <step.icon className="h-6 w-6 text-black" />
                </div>

                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="relative z-10 text-gray-400 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;