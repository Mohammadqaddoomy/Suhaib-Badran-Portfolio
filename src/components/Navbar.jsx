import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'my-work', label: 'My-works' },
  ];

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-effect shadow-2xl' 
          : 'bg-transparent'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer group"
          >
            <span className="text-2xl lg:text-3xl font-black tracking-tighter">
              <span className="gradient-text">PORTFOLIO</span>
            </span>
            <Motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-black"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`relative px-5 py-2 font-medium text-sm uppercase tracking-wider transition-colors duration-300 group ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                }`}
              >
                {item.label}
                <Motion.div
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Motion.button>
            ))}
            
            {/* Let's Talk Button with Animated Border */}
            <div className="relative group ml-4">
              {/* Animated Rainbow Border - Always Visible */}
              <div className="absolute -inset-[2px] opacity-100 transition-all duration-1000 pointer-events-none rounded-full">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                    style={{ 
                      backgroundSize: '600% 100%', 
                      animation: 'smoothRainbow 40s linear infinite',
                      WebkitAnimation: 'smoothRainbow 40s linear infinite',
                      willChange: 'background-position'
                    }} 
                  />
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute -inset-[3px] opacity-50 transition-all duration-1000 pointer-events-none blur-md rounded-full">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                  style={{ 
                    backgroundSize: '600% 100%', 
                    animation: 'smoothRainbow 40s linear infinite',
                    WebkitAnimation: 'smoothRainbow 40s linear infinite',
                    willChange: 'background-position'
                  }} 
                />
              </div>
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="relative px-6 py-2.5 font-semibold text-sm uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl text-black hover:brightness-90"
                style={{ backgroundColor: '#ffd4d4' }}
              >
                Let's Talk
              </Motion.button>
            </div>
            
           
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
           
            
            
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-3">
                {navItems.map((item) => (
                  <Motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileTap={{ scale: 0.5 }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Motion.button>
                ))}
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Motion.nav>
  );
};

export default Navbar;
