import { FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { generateBullets, smartBulletConvert } from '../../utils/resumeGenerator';

const Experience = ({ data, onChange, skills }) => {
  const addExperience = () => {
    onChange([...data, { company: '', position: '', startDate: '', endDate: '', current: false, description: '', bullets: [''] }]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = data.map((exp, i) => i === index ? { ...exp, [field]: value } : exp);
    onChange(updated);
  };

  const addBullet = (expIndex) => {
    const updated = data.map((exp, i) => i === expIndex ? { ...exp, bullets: [...(exp.bullets || []), ''] } : exp);
    onChange(updated);
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    const updated = data.map((exp, i) => {
      if (i === expIndex) {
        const bullets = [...(exp.bullets || [])];
        bullets[bulletIndex] = value;
        return { ...exp, bullets };
      }
      return exp;
    });
    onChange(updated);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const updated = data.map((exp, i) => {
      if (i === expIndex) {
        return { ...exp, bullets: exp.bullets.filter((_, bi) => bi !== bulletIndex) };
      }
      return exp;
    });
    onChange(updated);
  };

  const autoGenerateBullets = (expIndex) => {
    const exp = data[expIndex];
    const position = exp.position || 'Professional';
    const bullets = generateBullets(position, skills, 4);
    updateExperience(expIndex, 'bullets', bullets);
  };

  const smartConvertBullet = (expIndex, bulletIndex) => {
    const bullet = data[expIndex].bullets[bulletIndex];
    const converted = smartBulletConvert(bullet);
    updateBullet(expIndex, bulletIndex, converted);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Experience</h2>
          <p className="text-sm text-text-muted">Add your work experience</p>
        </div>
        <button onClick={addExperience} className="btn-primary text-xs">
          <FiPlus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </div>

      <AnimatePresence>
        {data.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary">Experience #{index + 1}</span>
              <div className="flex gap-1">
                <button onClick={() => autoGenerateBullets(index)} className="btn-ghost text-xs text-primary">
                  <FiZap className="w-3.5 h-3.5" /> Auto Bullets
                </button>
                <button onClick={() => removeExperience(index)} className="btn-ghost text-xs text-danger hover:bg-danger/10">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Company</label>
                <input type="text" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="input-field" placeholder="TechCorp Inc." />
              </div>
              <div>
                <label className="input-label">Position</label>
                <input type="text" value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)} className="input-field" placeholder="Senior Developer" />
              </div>
              <div>
                <label className="input-label">Start Date</label>
                <input type="month" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">End Date</label>
                <div className="flex items-center gap-2">
                  <input type="month" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="input-field" disabled={exp.current} />
                  <label className="flex items-center gap-1 text-xs text-text-muted whitespace-nowrap cursor-pointer">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(index, 'current', e.target.checked)} className="rounded" />
                    Current
                  </label>
                </div>
              </div>
            </div>

            {/* Bullet points */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="input-label mb-0">Key Achievements</label>
                <button onClick={() => addBullet(index)} className="btn-ghost text-xs">
                  <FiPlus className="w-3 h-3" /> Add Bullet
                </button>
              </div>
              {(exp.bullets || []).map((bullet, bi) => (
                <div key={bi} className="flex items-start gap-2 mb-2">
                  <span className="text-primary mt-2.5 text-sm">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => updateBullet(index, bi, e.target.value)}
                    className="input-field flex-1 text-sm py-2"
                    placeholder="Describe an achievement or responsibility..."
                  />
                  <button onClick={() => smartConvertBullet(index, bi)} className="btn-ghost text-xs mt-1 text-primary" title="Smart Convert">
                    <FiZap className="w-3 h-3" />
                  </button>
                  <button onClick={() => removeBullet(index, bi)} className="btn-ghost text-xs mt-1 text-danger">
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-10 text-text-muted">
          <p className="text-3xl mb-2">💼</p>
          <p>No experience added yet. Click "Add Experience" to start.</p>
        </div>
      )}
    </div>
  );
};

export default Experience;
