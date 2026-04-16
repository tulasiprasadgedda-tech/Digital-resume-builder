import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Education = ({ data, onChange }) => {
  const addEducation = () => {
    onChange([...data, { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) => i === index ? { ...edu, [field]: value } : edu);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Education</h2>
          <p className="text-sm text-text-muted">Add your educational background</p>
        </div>
        <button onClick={addEducation} className="btn-primary text-xs">
          <FiPlus className="w-3.5 h-3.5" /> Add Education
        </button>
      </div>

      <AnimatePresence>
        {data.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary">Education #{index + 1}</span>
              <button onClick={() => removeEducation(index)} className="btn-ghost text-xs text-danger hover:bg-danger/10">
                <FiTrash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Institution</label>
                <input type="text" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="input-field" placeholder="Stanford University" />
              </div>
              <div>
                <label className="input-label">Degree</label>
                <input type="text" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="input-field" placeholder="Bachelor of Science" />
              </div>
              <div>
                <label className="input-label">Field of Study</label>
                <input type="text" value={edu.field} onChange={(e) => updateEducation(index, 'field', e.target.value)} className="input-field" placeholder="Computer Science" />
              </div>
              <div>
                <label className="input-label">GPA</label>
                <input type="text" value={edu.gpa} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} className="input-field" placeholder="3.8" />
              </div>
              <div>
                <label className="input-label">Start Date</label>
                <input type="month" value={edu.startDate} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">End Date</label>
                <input type="month" value={edu.endDate} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} className="input-field" />
              </div>
            </div>
            <div className="mt-4">
              <label className="input-label">Description</label>
              <textarea value={edu.description} onChange={(e) => updateEducation(index, 'description', e.target.value)} className="input-field resize-y" placeholder="Relevant coursework, achievements..." rows={2} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-10 text-text-muted">
          <p className="text-3xl mb-2">🎓</p>
          <p>No education added yet. Click "Add Education" to start.</p>
        </div>
      )}
    </div>
  );
};

export default Education;
