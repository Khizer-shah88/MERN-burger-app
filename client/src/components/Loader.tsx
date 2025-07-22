import { motion } from 'framer-motion';

const Loader = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const layerVariants = (delay: number) => ({
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'linear',
        delay,
      },
    },
  });

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative w-40 h-40">
        {/* Top Bun */}
        <motion.div
          className="absolute w-40 h-14 bg-yellow-600 rounded-t-2xl shadow-lg"
          variants={layerVariants(0)}
          animate="animate"
          style={{ top: 0 }}
        />
        {/* Cheese */}
        <motion.div
          className="absolute w-36 h-4 bg-yellow-300 rounded-lg shadow-md"
          variants={layerVariants(0.2)}
          animate="animate"
          style={{ top: '56px', left: '2px' }}
        />
        {/* Patty */}
        <motion.div
          className="absolute w-34 h-8 bg-amber-800 rounded-lg shadow-md"
          variants={layerVariants(0.4)}
          animate="animate"
          style={{ top: '64px', left: '3px' }}
        />
        {/* Tomato */}
        <motion.div
          className="absolute w-32 h-4 bg-red-500 rounded-lg shadow-md"
          variants={layerVariants(0.6)}
          animate="animate"
          style={{ top: '76px', left: '4px' }}
        />
        {/* Lettuce */}
        <motion.div
          className="absolute w-30 h-4 bg-green-500 rounded-lg shadow-md"
          variants={layerVariants(0.8)}
          animate="animate"
          style={{ top: '84px', left: '5px' }}
        />
        {/* Bottom Bun */}
        <motion.div
          className="absolute w-40 h-14 bg-yellow-600 rounded-b-2xl shadow-lg"
          variants={layerVariants(1.0)}
          animate="animate"
          style={{ bottom: 0 }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;