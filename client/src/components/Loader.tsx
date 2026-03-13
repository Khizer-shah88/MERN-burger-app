import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const layers = [
    { label: 'top-bun',    bg: 'bg-yellow-600',  h: 'h-10', w: 'w-36', rounded: 'rounded-t-3xl', top: 0 },
    { label: 'cheese',     bg: 'bg-yellow-300',  h: 'h-3',  w: 'w-32', rounded: 'rounded-sm',    top: 40 },
    { label: 'patty',      bg: 'bg-amber-800',   h: 'h-6',  w: 'w-30', rounded: 'rounded-lg',    top: 43 },
    { label: 'tomato',     bg: 'bg-red-500',     h: 'h-3',  w: 'w-28', rounded: 'rounded-sm',    top: 49 },
    { label: 'lettuce',    bg: 'bg-green-500',   h: 'h-3',  w: 'w-26', rounded: 'rounded-sm',    top: 52 },
    { label: 'bottom-bun', bg: 'bg-yellow-600',  h: 'h-10', w: 'w-36', rounded: 'rounded-b-3xl', top: 55 },
  ];

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated burger */}
      <div className="relative w-36 h-24">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            className={`absolute ${layer.h} ${layer.w} ${layer.bg} ${layer.rounded} shadow-md mx-auto left-0 right-0`}
            style={{ top: layer.top }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="flex items-center gap-1"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase">Loading</span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full bg-yellow-400 block"
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Loader;