import { useState } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = ({ data, onChange }) => {
  const [input, setInput] = useState('');

  const addSkill = () => {
    if (!input.trim()) return;
    if (data.some(s => s.name.toLowerCase() === input.trim().toLowerCase())) return;
    onChange([...data, { name: input.trim(), level: 'Intermediate' }]);
    setInput('');
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateLevel = (index, level) => {
    const updated = data.map((skill, i) => i === index ? { ...skill, level } : skill);
    onChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = {
    Beginner: 'bg-gray-200 text-gray-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700',
    Expert: 'bg-green-100 text-green-700'
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Skills</h2>
      <p className="text-sm text-text-muted mb-6">Add your technical and professional skills</p>

      {/* Add skill input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field flex-1"
          placeholder="Type a skill and press Enter..."
        />
        <button onClick={addSkill} className="btn-primary">
          <FiPlus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Skills grid */}
      <div className="space-y-2">
        <AnimatePresence>
          {data.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm text-text dark:text-text-dark">{skill.name}</span>
                <div className="flex gap-1">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => updateLevel(index, level)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                        skill.level === level ? levelColors[level] : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => removeSkill(index)} className="text-text-muted hover:text-danger transition-colors">
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.length === 0 && (
        <div className="text-center py-10 text-text-muted">
          <p className="text-3xl mb-2">⚡</p>
          <p>No skills added yet. Type a skill above and press Enter.</p>
        </div>
      )}

      {data.length > 0 && (
        <p className="text-xs text-text-muted mt-4">{data.length} skill{data.length !== 1 ? 's' : ''} added</p>
      )}
    </div>
  );
};

export default Skills;
