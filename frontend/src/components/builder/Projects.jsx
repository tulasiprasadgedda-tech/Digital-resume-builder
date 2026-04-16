import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = ({ data, onChange }) => {
  const addProject = () => {
    onChange([...data, { name: '', description: '', technologies: '', link: '' }]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = data.map((proj, i) => i === index ? { ...proj, [field]: value } : proj);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Projects</h2>
          <p className="text-sm text-text-muted">Showcase your notable projects</p>
        </div>
        <button onClick={addProject} className="btn-primary text-xs">
          <FiPlus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      <AnimatePresence>
        {data.map((proj, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary">Project #{index + 1}</span>
              <button onClick={() => removeProject(index)} className="btn-ghost text-xs text-danger hover:bg-danger/10">
                <FiTrash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Project Name</label>
                <input type="text" value={proj.name} onChange={(e) => updateProject(index, 'name', e.target.value)} className="input-field" placeholder="TaskFlow Pro" />
              </div>
              <div>
                <label className="input-label">Technologies</label>
                <input type="text" value={proj.technologies} onChange={(e) => updateProject(index, 'technologies', e.target.value)} className="input-field" placeholder="React, Node.js, MongoDB" />
              </div>
            </div>
            <div className="mt-4">
              <label className="input-label">Description</label>
              <textarea value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} className="input-field resize-y" placeholder="Describe your project, its features, and impact..." rows={3} />
            </div>
            <div className="mt-4">
              <label className="input-label">Link</label>
              <input type="text" value={proj.link} onChange={(e) => updateProject(index, 'link', e.target.value)} className="input-field" placeholder="github.com/user/project" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-10 text-text-muted">
          <p className="text-3xl mb-2">🚀</p>
          <p>No projects added yet. Click "Add Project" to start.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
