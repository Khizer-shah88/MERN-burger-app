import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as HeroLink,
  Button,
} from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom'; // Use react-router-dom Link for routing
import { Menu, X } from 'lucide-react'; // For hamburger menu icons

// Define types for clarity
interface MenuItem {
  name: string;
  path: string;
}

export const HamKingLogo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Custom HamKing Logo: Burger with a crown for "HamKing" */}
      <svg fill="none" height="36" viewBox="0 0 36 36" width="36" className="text-orange-500">
        <path
          d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4Zm0 2.5c6.351 0 11.5 5.149 11.5 11.5S24.351 29.5 18 29.5 6.5 24.351 6.5 18 11.649 6.5 18 6.5Zm-6 8.5a2 2 0 100 4 2 2 0 000-4Zm12 0a2 2 0 100 4 2 2 0 000-4Zm-6 2a2 2 0 11-4 0 2 2 0 014 0Zm0 8a2 2 0 100-4 2 2 0 000 4Zm-6-2a2 2 0 11-4 0 2 2 0 014 0Zm12 0a2 2 0 11-4 0 2 2 0 014 0Z"
          fill="currentColor"
        />
        {/* Crown for "King" */}
        <path
          d="M18 8.5c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2Zm-6 2a2 2 0 100 4 2 2 0 000-4Zm12 0a2 2 0 100 4 2 2 0 000-4Zm-6 8a2 2 0 11-4 0 2 2 0 014 0Zm-6-2a2 2 0 100 4 2 2 0 000-4Zm12 0a2 2 0 100 4 2 2 0 000-4Z"
          fill="currentColor"
        />
      </svg>
      <p className="font-bold text-orange-500 text-xl">HamKing</p>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Added type for state
  const navigate = useNavigate(); // For routing with react-router-dom

  const menuItems: MenuItem[] = [
    { name: 'Profile', path: '/profile' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Activity', path: '/activity' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'System', path: '/system' },
    { name: 'Deployments', path: '/deployments' },
    { name: 'My Settings', path: '/my-settings' },
    { name: 'Team Settings', path: '/team-settings' },
    { name: 'Help & Feedback', path: '/help-feedback' },
    { name: 'Log Out', path: '/logout' },
  ];

  const linkVariants = {
    hover: { scale: 1.1, color: '#f97316', transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#ea580c', transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Navbar className="bg-black text-orange-500 text-xl fixed w-full z-50 shadow-md">
        <NavbarContent>
          {/* Hamburger Menu for Mobile */}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </NavbarMenuToggle>

          {/* Logo Centered */}
          <NavbarBrand className="flex-1 flex justify-center sm:justify-start">
            <HamKingLogo />
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Menu Items */}
        <NavbarContent className="hidden sm:flex gap-6 justify-center flex-1" justify="center">
          {['Features', 'Customers', 'Integrations'].map((item) => (
            <NavbarItem key={item}>
              <motion.div whileHover={linkVariants.hover} whileTap={linkVariants.tap}>
                <HeroLink
                  href={`#${item.toLowerCase()}`}
                  className="text-orange-500 hover:text-orange-600 transition-colors duration-300 font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`#${item.toLowerCase()}`);
                  }}
                >
                  {item}
                </HeroLink>
              </motion.div>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Login and Sign Up Buttons */}
        <NavbarContent justify="end" className="gap-4 items-center">
          <NavbarItem className="hidden lg:flex">
            <motion.div whileHover={linkVariants.hover} whileTap={linkVariants.tap}>
              <HeroLink
                href="#login"
                className="text-orange-500 hover:text-orange-600 transition-colors duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Login
              </HeroLink>
            </motion.div>
          </NavbarItem>
          <NavbarItem>
            <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
              <Button
                as={Link}
                href="#signup"
                color="primary"
                variant="flat"
                className="bg-orange-500 text-white hover:bg-orange-600 rounded-md px-6 py-2 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }}
              >
                Sign Up
              </Button>
            </motion.div>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Sidebar Menu */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 z-40 p-4 sm:hidden"
          variants={sidebarVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-orange-500 text-2xl"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                whileHover={linkVariants.hover}
                whileTap={linkVariants.tap}
              >
                <Link
                  to={item.path}
                  className="w-full py-4 text-orange-500 hover:text-orange-600 transition-colors duration-300 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Navbar>
    </>
  );
}