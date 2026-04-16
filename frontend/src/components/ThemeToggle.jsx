import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-primary/10"
      aria-label="Toggle theme"
      id="theme-toggle-btn"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FiSun className="w-5 h-5 text-amber-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FiMoon className="w-5 h-5 text-indigo-400" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
