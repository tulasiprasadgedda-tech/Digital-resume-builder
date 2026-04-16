import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX, FiFileText, FiGrid, FiLogOut, FiUser, FiHome } from 'react-icons/fi';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
        { to: '/templates', label: 'Templates', icon: FiFileText },
      ]
    : [
        { to: '/', label: 'Home', icon: FiHome },
      ];

  const isActive = (path) => location.pathname === path;

  // Hide navbar on builder page for more space
  if (location.pathname.startsWith('/builder')) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 no-print"
    >
      <div className="mx-4 mt-3">
        <div className="glass-card px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <FiFileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">AutoResume Pro</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5">
                  <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                    <FiUser className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-text dark:text-text-dark">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-ghost text-danger hover:bg-danger/10 hover:text-danger" id="logout-btn">
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-ghost" id="nav-login-btn">Sign In</Link>
                <Link to="/register" className="btn-primary" id="nav-register-btn">Get Started</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass-card p-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-danger/10">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-text-muted hover:bg-black/5">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white bg-primary text-center">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
