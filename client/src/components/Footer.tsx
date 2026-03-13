import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black/90 backdrop-blur-xl mt-8">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-10">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-xl shadow-lg">
                <UtensilsCrossed className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                BurgerBite
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delicious handcrafted burgers delivered to your doorstep. Fresh ingredients, amazing taste, lightning-fast delivery.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-1">
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
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/30 hover:bg-yellow-400/10 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Menu</h4>
            <ul className="space-y-2.5">
              {['Burgers', 'Sides', 'Drinks', 'Deals'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/menu/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400/40 group-hover:bg-yellow-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              {[
                { text: 'About Us', path: '/about' },
                { text: 'Careers', path: '/careers' },
                { text: 'Contact', path: '/contact' },
                { text: 'Admin Panel', path: '/admin' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400/40 group-hover:bg-yellow-400 transition-colors" />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                hello@burgerbite.com
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                123 Burger St, Food City, FC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BurgerBite. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { text: 'Privacy Policy', path: '/privacy' },
              { text: 'Terms of Service', path: '/terms' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-500 hover:text-yellow-400 transition-colors text-sm"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;