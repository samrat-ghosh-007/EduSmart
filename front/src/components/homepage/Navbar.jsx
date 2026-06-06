import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
   { name: 'Features', path: '/features' },
    { name: 'About us', path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 px-8 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.03)] border-b border-gray-100/70' 
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Premium Logo - Static version without animations */}
        <Link to="/" className="relative group">
          <div className="flex items-center gap-3">
            {/* Premium Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                {/* Main icon */}
                <svg 
                  className="w-5 h-5 text-white relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.8} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>

                {/* Static dot */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full ring-2 ring-white/90" />
              </div>
            </div>

            {/* Premium Logo Text with gradient */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  AI
                </span>
                <span className="text-2xl font-light text-gray-700">
                  Career
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation Links - Enhanced with premium styling */}
        <div className="hidden md:flex items-center gap-10">
          {/* Regular Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <span className="relative">
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Premium Get Started Button */}
          <Link
            to="/features"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 overflow-hidden"
          >
            {/* Animated background effect */}
            <motion.div
              animate={{
                x: ['0%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            
            <span className="relative">Get Started</span>
            <motion.svg 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-4 h-4 relative" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>

            {/* Premium sparkle effect */}
            <motion.div
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-2 h-2"
            >
              <span className="text-white text-xs">✦</span>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button - Enhanced */}
        <button
          className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/80 transition-colors border border-gray-200/30 bg-white/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Enhanced premium version */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="pt-6 pb-4 space-y-2"
            >
              {/* Premium decorative header */}
              <div className="px-4 py-2 mb-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Navigation
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
              </div>

              {[...navLinks, { name: 'Get Started', path: '/login', highlight: true }].map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block mx-4 px-4 py-4 rounded-xl transition-all ${
                      link.highlight
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-medium shadow-lg shadow-indigo-500/20'
                        : location.pathname === link.path
                        ? 'bg-gradient-to-r from-indigo-50/80 to-purple-50/80 text-indigo-600 border border-indigo-100/50 backdrop-blur-sm'
                        : 'text-gray-600 hover:bg-white/80 hover:backdrop-blur-sm'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{link.name}</span>
                      {link.highlight ? (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      ) : (
                        location.pathname === link.path && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                          />
                        )
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Premium footer for mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 px-4 py-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl mx-4 backdrop-blur-sm border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Enterprise Access</div>
                    <div className="text-sm font-semibold text-gray-800">Premium Features</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;