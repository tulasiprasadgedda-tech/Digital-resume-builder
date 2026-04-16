import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { FiPlus, FiEdit, FiTrash2, FiCopy, FiMoreVertical, FiFileText, FiGrid, FiList, FiClock, FiSearch } from 'react-icons/fi';
import { getCompletionPercentage } from '../utils/scoreCalculator';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { resumes, loading, fetchResumes, createResume, deleteResume, duplicateResume } = useResume();
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleCreate = async () => {
    try {
      const resume = await createResume({ title: 'My New Resume' });
      navigate(`/builder/${resume._id}`);
    } catch (e) {
      // error handled in context
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(id);
    }
    setActiveMenu(null);
  };

  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.personalInfo?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-text dark:text-text-dark">My Resumes</h1>
            <p className="text-text-muted text-sm mt-1">{resumes.length} resume{resumes.length !== 1 ? 's' : ''} created</p>
          </div>
          <button onClick={handleCreate} className="btn-primary" id="create-resume-btn">
            <FiPlus className="w-4 h-4" />
            Create New Resume
          </button>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resumes..."
              className="input-field pl-10 py-2.5"
              id="search-resumes-input"
            />
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-surface-dark p-1 rounded-xl border border-border dark:border-border-dark">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-primary/10 text-primary' : 'text-text-muted'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary/10 text-primary' : 'text-text-muted'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-6">
                <div className="skeleton h-5 w-3/4 mb-4" />
                <div className="skeleton h-3 w-1/2 mb-2" />
                <div className="skeleton h-3 w-2/3 mb-4" />
                <div className="skeleton h-2 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredResumes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
              <FiFileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-2">
              {search ? 'No resumes found' : 'No resumes yet'}
            </h2>
            <p className="text-text-muted mb-6">
              {search ? 'Try a different search term' : 'Create your first resume and land your dream job!'}
            </p>
            {!search && (
              <button onClick={handleCreate} className="btn-primary text-base px-8 py-3">
                <FiPlus className="w-5 h-5" />
                Create Your First Resume
              </button>
            )}
          </motion.div>
        )}

        {/* Resume cards */}
        {!loading && filteredResumes.length > 0 && (
          <div className={view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-3'
          }>
            <AnimatePresence>
              {filteredResumes.map((resume, i) => {
                const completion = getCompletionPercentage(resume);
                return (
                  <motion.div
                    key={resume._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={`glass-card group relative ${view === 'list' ? 'p-4 flex items-center gap-4' : 'p-6'}`}
                  >
                    {/* Card content */}
                    <div className={view === 'list' ? 'flex-1 flex items-center gap-4' : ''}>
                      {/* Template preview placeholder */}
                      {view === 'grid' && (
                        <div className="w-full h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl mb-4 flex items-center justify-center border border-border/50 dark:border-border-dark/50">
                          <FiFileText className="w-10 h-10 text-primary/30" />
                        </div>
                      )}

                      <div className={view === 'list' ? 'flex-1' : ''}>
                        <h3 className="font-semibold text-text dark:text-text-dark text-lg truncate">
                          {resume.title}
                        </h3>
                        {resume.personalInfo?.fullName && (
                          <p className="text-sm text-text-muted mt-0.5">{resume.personalInfo.fullName}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            {formatDate(resume.updatedAt)}
                          </span>
                          <span className="text-primary font-medium">{completion}% complete</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className={`${view === 'list' ? 'w-32' : 'mt-4'}`}>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 gradient-bg"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`flex items-center gap-1 ${view === 'grid' ? 'mt-4 pt-4 border-t border-border/50 dark:border-border-dark/50' : ''}`}>
                      <Link
                        to={`/builder/${resume._id}`}
                        className="btn-ghost text-xs flex-1 justify-center"
                      >
                        <FiEdit className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => duplicateResume(resume._id)}
                        className="btn-ghost text-xs"
                      >
                        <FiCopy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="btn-ghost text-xs text-danger hover:bg-danger/10"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
