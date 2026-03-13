import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UtensilsCrossed, Instagram, Twitter, Facebook, ShoppingBag, Timer, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define variants for animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const DealsPage: React.FC = () => {
  const navigate = useNavigate();

  const deals = [
    {
      category: 'Student Deals',
      items: [
        {
          title: '20% Off for Students',
          description: 'Show your student ID and get 20% off on all orders.',
          icon: '🎓',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww', // Burger image
          price: '$12.99',
          originalPrice: '$16.99',
          items: ['Classic Burger', 'Fries', 'Drink'],
          tag: 'Most Popular',
        },
        {
          title: 'Free Drink with Meal',
          description: 'Get a free drink with any meal purchase.',
          icon: '🥤',
          image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZXN8ZW58MHx8MHx8fDA%3D', // Fries image
          price: '$9.99',
          originalPrice: '$12.99',
          items: ['Any Size Drink'],
          tag: 'Best Value',
        },
        {
          title: 'Student Lunch Special',
          description: 'Available Mon-Fri, 11am-3pm',
          icon: '📚',
          image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyJTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D', // Burger meal image
          price: '$8.99',
          originalPrice: '$11.99',
          items: ['Chicken Burger', 'Small Fries', 'Small Drink'],
          tag: 'Limited Time',
        },
      ],
    },
    {
      category: 'Family Deals',
      items: [
        {
          title: 'Family Feast Pack',
          description: 'Perfect for family of 4',
          icon: '👨‍👩‍👧‍👦',
          image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwYnVyZ2VyJTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D', // Family meal image
          price: '$39.99',
          originalPrice: '$49.99',
          items: ['4 Burgers', '2 Large Fries', '4 Drinks', '2 Desserts'],
          tag: 'Best Seller',
        },
        {
          title: 'Kids Meal Deal',
          description: 'Kids under 10 eat free with every adult meal.',
          icon: '🍔',
          image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D', // Kids burger image
          price: '$14.99',
          originalPrice: '$19.99',
          items: ['Junior Burger', 'Small Fries', 'Kids Drink', 'Toy'],
          tag: 'Kids Special',
        },
        {
          title: 'Weekend Family Special',
          description: 'Available Sat-Sun, all day',
          icon: '🎉',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww', // Burger image
          price: '$34.99',
          originalPrice: '$44.99',
          items: ['3 Burgers', '2 Large Fries', '3 Drinks', 'Family Dessert'],
          tag: 'Weekend Only',
        },
      ],
    },
  ];

  const handleOrder = (item: any) => {
    // Navigate to the checkout page with the selected deal's data
    navigate('/checkout', { state: { selectedDeal: item } });
  };
  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      {/* Top accent */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent z-50" />

      {/* Navbar */}
      <motion.nav
        className="sticky top-0 z-40 bg-black/70 backdrop-blur-2xl border-b border-white/10 py-3"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-6xl">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-xl shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
              <UtensilsCrossed className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              BurgerBite
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link to="/" className="hidden sm:block text-sm font-medium text-gray-400 hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link to="/checkout" className="hidden sm:block text-sm font-medium text-gray-400 hover:text-yellow-400 transition-colors">
              Checkout
            </Link>
            <Button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-orange-500 rounded-xl px-4 py-2 flex items-center gap-2 font-bold text-sm shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        className="relative py-16 sm:py-20 overflow-hidden"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-yellow-400/5 to-transparent pointer-events-none" />
        <div className="absolute top-8 left-1/3 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <motion.span
            className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-bold px-4 py-2 rounded-full border border-yellow-400/20 mb-4 tracking-widest uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Limited Time Offers
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
            variants={slideIn}
          >
            Today's Special{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Deals
            </span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto"
            variants={fadeIn}
          >
            Discover amazing savings on your favorite meals. Limited time offers you can't resist!
          </motion.p>
        </div>
      </motion.div>

      {/* Deals Section */}
      <motion.section
        className="container mx-auto px-4 sm:px-6 pb-16 max-w-6xl"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.category}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="bg-zinc-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                <h3 className="text-xl font-black text-yellow-400 mb-5 flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-gradient-to-b from-yellow-400 to-orange-400" />
                  {deal.category}
                </h3>
                <div className="space-y-5">
                  {deal.items.map((item) => (
                    <motion.div
                      key={item.title}
                      className="group relative flex flex-col gap-4 p-5 bg-white/[0.03] rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Tag */}
                      <div className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-black px-3 py-1 rounded-full z-10 shadow-lg">
                        {item.tag}
                      </div>

                      {/* Image */}
                      <div className="relative h-44 w-full overflow-hidden rounded-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        {/* Price */}
                        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1.5 rounded-xl font-black text-sm shadow-lg">
                          <span className="line-through opacity-60 mr-1.5 text-xs">{item.originalPrice}</span>
                          {item.price}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 text-sm mt-0.5">{item.description}</p>
                        </div>
                      </div>

                      {/* Included items */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.items.map((foodItem, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2.5 py-1 rounded-full flex items-center gap-1"
                            >
                              <Tag className="h-2.5 w-2.5" />
                              {foodItem}
                            </span>
                          ))}
                        </div>

                        <Button
                          onClick={() => handleOrder(item)}
                          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Order Now
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="relative border-t border-white/10 py-14 overflow-hidden"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-xl relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Don't Miss Out on{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Limited Offers!
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-6 text-sm">
            <Timer className="h-4 w-4 text-yellow-400" />
            These deals won't last forever. Order now!
          </div>
          <Button
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500 font-black px-8 py-3 rounded-xl shadow-xl shadow-yellow-400/20 text-base"
            onClick={() => navigate('/')}
          >
            Browse Full Menu
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-8">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-1.5 rounded-lg">
              <UtensilsCrossed className="h-4 w-4 text-black" />
            </div>
            <span className="font-black text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">BurgerBite</span>
          </Link>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} BurgerBite. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default DealsPage;