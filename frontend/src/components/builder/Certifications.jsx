import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Certifications = ({ data, onChange }) => {
  const addCert = () => {
    onChange([...data, { name: '', issuer: '', date: '', link: '' }]);
  };

  const removeCert = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCert = (index, field, value) => {
    const updated = data.map((cert, i) => i === index ? { ...cert, [field]: value } : cert);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Certifications</h2>
          <p className="text-sm text-text-muted">Add your professional certifications</p>
        </div>
        <button onClick={addCert} className="btn-primary text-xs">
          <FiPlus className="w-3.5 h-3.5" /> Add Certification
        </button>
      </div>

      <AnimatePresence>
        {data.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary">Certification #{index + 1}</span>
              <button onClick={() => removeCert(index)} className="btn-ghost text-xs text-danger hover:bg-danger/10">
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Certification Name</label>
                <input type="text" value={cert.name} onChange={(e) => updateCert(index, 'name', e.target.value)} className="input-field" placeholder="AWS Solutions Architect" />
              </div>
              <div>
                <label className="input-label">Issuer</label>
                <input type="text" value={cert.issuer} onChange={(e) => updateCert(index, 'issuer', e.target.value)} className="input-field" placeholder="Amazon Web Services" />
              </div>
              <div>
                <label className="input-label">Date</label>
                <input type="month" value={cert.date} onChange={(e) => updateCert(index, 'date', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="input-label">Link (optional)</label>
                <input type="text" value={cert.link} onChange={(e) => updateCert(index, 'link', e.target.value)} className="input-field" placeholder="certification-url.com" />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-10 text-text-muted">
          <p className="text-3xl mb-2">📜</p>
          <p>No certifications added yet. Click "Add Certification" to start.</p>
        </div>
      )}
    </div>
  );
};

export default Certifications;
