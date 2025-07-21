import React from 'react';
import { motion } from 'framer-motion';
import { Apple, PlayCircle } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { Button } from './ui/button'; // Adjust the import according to your project structure

// Define variants for animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

interface AppLoadProps {
  navigate: (path: string) => void;
}

const AppLoad: React.FC<AppLoadProps> = ({ navigate }) => {
  return (
    <motion.section
      className="container py-8 sm:py-12 md:py-24 px-2 sm:px-4 md:px-6 mx-auto relative left-0 sm:left-8 md:left-1 w-full max-w-[95%]"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="relative rounded-2xl overflow-hidden mx-auto w-full">
        <div className="absolute inset-0">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/public/images/burger.jpg.png"
              onError={(e) => {
                (e.target as HTMLImageElement).srcset =
                  'https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=1200&h=400&fit=crop&auto=format';
              }}
            />
            <img
              src="/public/images/burger.jpg.png"
              alt="App banner background"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=600&h=800&fit=crop&auto=format';
              }}
            />
          </picture>
        </div>

        <motion.div className="absolute inset-0 bg-gradient-to-r opacity-90 backdrop-blur-sm" />

        <div className="relative p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-center">
            <motion.div
              className="space-y-4 text-center md:text-left"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: 'easeOut',
                  },
                },
              }}
            >
              <motion.h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tighter"
                animate={{
                  scale: [1, 1.02, 1],
                  textShadow: [
                    '0 0 0px rgba(255,255,255,0.3)',
                    '0 0 10px rgba(255,255,255,0.5)',
                    '0 0 0px rgba(255,255,255,0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Get the BurgerBite App
              </motion.h2>

              <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg">
                Order faster, earn rewards, and track your delivery in real-time.
              </p>

              <div className="flex flex-col xs:flex-row gap-3 justify-center md:justify-start">
                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }} className="w-full xs:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full xs:w-auto bg-black/80 text-white hover:bg-black/90 
                      border-2 border-white/20 hover:border-white/40 gap-2 
                      rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base backdrop-blur-sm"
                    onClick={() => navigate('/app-store')}
                    aria-label="Download from App Store"
                  >
                    <Apple className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    App Store
                  </Button>
                </motion.div>

                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }} className="w-full xs:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full xs:w-auto bg-black/80 text-white hover:bg-black/90 
                      border-2 border-white/20 hover:border-white/40 gap-2 
                      rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base backdrop-blur-sm"
                    onClick={() => navigate('/play-store')}
                    aria-label="Download from Play Store"
                  >
                    <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    Play Store
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative mx-auto w-[200px] xs:w-[250px] sm:w-[300px] max-w-full"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                  },
                },
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <div className="absolute -inset-1 rounded-lg bg-white/20 blur-xl" />
              <img
                alt="Mobile app screenshot"
                className="relative rounded-lg shadow-lg w-full h-auto"
                src="/public/images/app-screenshot.png"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x600?text=BurgerBite+App';
                }}
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AppLoad;