import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

// Define variants for animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="border-t border-black bg-yellow-500 text-white font-bold rounded-t-4xl w-full"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-[95%]">
        <div className="flex flex-col gap-8">
          {/* Grid for Footer Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-6 w-6" />
                <span className="text-xl font-bold text-white">BurgerBite</span>
              </div>
              <p className="text-black text-sm sm:text-base">
                Delicious burgers delivered to your doorstep. Fresh ingredients, amazing taste, and lightning-fast
                delivery.
              </p>
            </div>

            {/* Menu Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-yellow-600">Menu</h4>
              <ul className="space-y-2">
                {['Burgers', 'Sides', 'Drinks'].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/menu/${item.toLowerCase()}`}
                      className="text-black hover:text-white transition-colors text-sm sm:text-base"
                      aria-label={`${item} Menu`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-yellow-600">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-black hover:text-white transition-colors text-sm sm:text-base"
                      aria-label={item}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-yellow-600">Legal</h4>
              <ul className="space-y-2">
                {[
                  { text: 'Privacy Policy', path: 'privacy' },
                  { text: 'Terms of Service', path: 'terms' },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={`/${item.path}`}
                      className="text-black hover:text-white transition-colors text-sm sm:text-base"
                      aria-label={item.text}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-yellow-300">
            {/* Copyright */}
            <p className="text-black text-sm sm:text-base text-center sm:text-left">
              © 2025 BurgerBite. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                <Link
                  key={social}
                  to={`/${social.toLowerCase()}`}
                  className="text-black hover:text-white transition-colors text-sm sm:text-base"
                  aria-label={social}
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;