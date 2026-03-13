import React from 'react';
import { motion } from 'framer-motion';
import { Apple, PlayCircle, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface AppLoadProps {
  navigate: (path: string) => void;
}

const AppLoad: React.FC<AppLoadProps> = ({ navigate }) => {
  return (
    <section className="py-12 sm:py-20 px-4 mx-auto max-w-6xl">
      <motion.div
        className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop"
            alt="App banner background"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Text content */}
            <motion.div
              className="space-y-6 text-center md:text-left"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold px-4 py-2 rounded-full">
                <Zap className="h-3.5 w-3.5" />
                NOW AVAILABLE
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Get the{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  BurgerBite
                </span>{' '}
                App
              </h2>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm mx-auto md:mx-0">
                Order faster, earn exclusive rewards, and track your delivery in real-time. All in one app.
              </p>

              {/* App store rating */}
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">4.9 · 12K+ ratings</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 border border-white/20 gap-2.5 rounded-xl px-5 py-3 font-semibold text-sm shadow-lg"
                    onClick={() => navigate('/app-store')}
                    aria-label="Download from App Store"
                  >
                    <Apple className="h-5 w-5" />
                    <div className="text-left leading-none">
                      <div className="text-[10px] font-normal opacity-70">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 border border-white/20 gap-2.5 rounded-xl px-5 py-3 font-semibold text-sm shadow-lg"
                    onClick={() => navigate('/play-store')}
                    aria-label="Download from Play Store"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <div className="text-left leading-none">
                      <div className="text-[10px] font-normal opacity-70">Get it on</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              animate={{ y: [0, -12, 0] }}
            >
              <div className="relative w-48 sm:w-56 lg:w-64">
                {/* Phone frame */}
                <div className="relative bg-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl overflow-hidden aspect-[9/19.5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-black font-black text-lg">BB</span>
                    </div>
                    <span className="text-yellow-400 font-bold text-sm">BurgerBite</span>
                    <span className="text-gray-400 text-xs text-center">Fast · Fresh · Delicious</span>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full z-10" />
                </div>
                {/* Glow */}
                <div className="absolute -inset-4 bg-yellow-400/10 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AppLoad;