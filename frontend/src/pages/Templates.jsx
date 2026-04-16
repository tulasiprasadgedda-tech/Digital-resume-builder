import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { templateList } from '../templates';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { FiSearch, FiHeart, FiGrid, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Templates = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const { user, isAuthenticated, updateFavorites } = useAuth();
  const { createResume } = useResume();
  const navigate = useNavigate();

  const categories = ['All', 'Minimal', 'Professional', 'Creative', 'ATS-Friendly', 'Dark Mode'];

  const filteredTemplates = templateList.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const isFavorite = (templateId) => {
    return user?.favoriteTemplates?.includes(templateId);
  };

  const toggleFavorite = async (templateId) => {
    if (!isAuthenticated) {
      toast.error('Please login to save favorites');
      return;
    }
    const favorites = user.favoriteTemplates || [];
    const updated = favorites.includes(templateId)
      ? favorites.filter(f => f !== templateId)
      : [...favorites, templateId];
    await updateFavorites(updated);
    toast.success(favorites.includes(templateId) ? 'Removed from favorites' : 'Added to favorites!');
  };

  const useTemplate = async (templateId) => {
    if (!isAuthenticated) {
      navigate('/register');
      toast.error('Please create an account first');
      return;
    }
    try {
      const resume = await createResume({ templateId, title: `Resume - ${templateList.find(t => t.id === templateId)?.name}` });
      navigate(`/builder/${resume._id}`);
    } catch (e) {
      // handled in context
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-text dark:text-text-dark mb-3">
            Choose Your <span className="gradient-text">Template</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            20+ professionally designed templates. All free. Pick one and start building.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="input-field pl-10"
              id="search-templates-input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-surface-dark text-text-muted border border-border dark:border-border-dark hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Template Grid - Canva-style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Preview */}
              <div className="relative h-56 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${template.preview}15, ${template.preview}30)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">{template.icon}</span>
                </div>

                {/* Hover overlay */}
                {hoveredId === template.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                  >
                    <button
                      onClick={() => useTemplate(template.id)}
                      className="px-5 py-2.5 bg-white text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      Use Template
                    </button>
                  </motion.div>
                )}

                {/* Favorite button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(template.id); }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isFavorite(template.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-400 hover:text-red-500'
                  }`}
                >
                  <FiHeart className="w-4 h-4" fill={isFavorite(template.id) ? 'currentColor' : 'none'} />
                </button>

                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-black/60 text-xs font-medium rounded-lg"
                  style={{ color: template.preview }}>
                  {template.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-text dark:text-text-dark">{template.name}</h3>
                <p className="text-xs text-text-muted mt-1">{template.category} • Free</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            <FiGrid className="w-12 h-12 mx-auto mb-4 text-text-muted/30" />
            <p className="text-lg">No templates found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
