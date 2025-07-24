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
      {/* Navbar */}
      <motion.nav
        className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 py-4"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold">BurgerBite</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/menu" className="text-sm font-medium hover:text-yellow-500 transition-colors">
              Menu
            </Link>
            <Link to="/offers" className="text-sm font-medium hover:text-yellow-500 transition-colors">
              Offers
            </Link>
            <Button 
              onClick={() => navigate('/checkout')}
              className="bg-yellow-500 text-black hover:bg-yellow-400 rounded-full px-4 py-2 flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-b from-yellow-500/20 to-transparent py-16"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            variants={slideIn}
          >
            Today's Special <span className="text-yellow-500">Deals</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Discover amazing savings on your favorite meals. Limited time offers you can't resist!
          </motion.p>
        </div>
      </motion.div>

      {/* Deals Section */}
      <motion.section
        className="container mx-auto px-4 py-12"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.category}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-zinc-800/50 p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-yellow-500 mb-6">{deal.category}</h3>
                <div className="space-y-6">
                  {deal.items.map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="group relative flex flex-col gap-4 p-6 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Tag */}
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                        {item.tag}
                      </div>

                      {/* Image */}
                      <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Price tag */}
                        <div className="absolute bottom-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
                          <span className="text-sm line-through opacity-75 mr-2">{item.originalPrice}</span>
                          <span>{item.price}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <span className="text-2xl bg-yellow-500/10 p-2 rounded-lg">{item.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold group-hover:text-yellow-500 transition-colors">{item.title}</h4>
                          <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-yellow-500 mb-2">Included Items:</h5>
                        <ul className="flex flex-wrap gap-2 mb-4">
                          {item.items.map((foodItem, idx) => (
                            <li 
                              key={idx}
                              className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full flex items-center gap-1"
                            >
                              <Tag className="h-3 w-3" />
                              {foodItem}
                            </li>
                          ))}
                        </ul>
                        
                        <Button
                          onClick={() => handleOrder(item)}
                          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
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
        className="bg-yellow-500/10 py-12 mt-8"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">
            Limited Time Offers!
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-300 mb-6">
            <Timer className="h-5 w-5 text-yellow-500" />
            <p>These deals won't last forever. Order now!</p>
          </div>
          <Button
            className="bg-yellow-500 text-black hover:bg-yellow-400 border-2 border-yellow-600 hover:border-yellow-500 p-2 px-8 rounded-full text-lg"
            onClick={() => navigate('/menu')}
          >
            View Full Menu
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="bg-black/50 mt-12 py-8 border-t border-white/10"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 text-yellow-500 hover:text-yellow-400" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6 text-yellow-500 hover:text-yellow-400" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6 text-yellow-500 hover:text-yellow-400" />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 BurgerBite. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default DealsPage;