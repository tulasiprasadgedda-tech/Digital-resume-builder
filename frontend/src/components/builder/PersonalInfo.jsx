import { FiMic } from 'react-icons/fi';

const PersonalInfo = ({ data, onChange, onVoice, isListening }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Personal Information</h2>
      <p className="text-sm text-text-muted mb-6">Add your contact details and professional summary</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Full Name</label>
          <input type="text" value={data.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} className="input-field" placeholder="Arun" />
        </div>
        <div>
          <label className="input-label">Email</label>
          <input type="email" value={data.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="input-field" placeholder="arun@example.com" />
        </div>
        <div>
          <label className="input-label">Phone</label>
          <input type="tel" value={data.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="input-field" placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <label className="input-label">Location</label>
          <input type="text" value={data.location || ''} onChange={(e) => handleChange('location', e.target.value)} className="input-field" placeholder="San Francisco, CA" />
        </div>
        <div>
          <label className="input-label">LinkedIn</label>
          <input type="text" value={data.linkedin || ''} onChange={(e) => handleChange('linkedin', e.target.value)} className="input-field" placeholder="linkedin.com/in/arun" />
        </div>
        <div>
          <label className="input-label">Website</label>
          <input type="text" value={data.website || ''} onChange={(e) => handleChange('website', e.target.value)} className="input-field" placeholder="arun.dev" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <label className="input-label mb-0">Professional Summary</label>
          <button
            onClick={() => onVoice?.('personalInfo.summary')}
            className={`btn-ghost text-xs ${isListening ? 'text-red-500' : ''}`}
          >
            <FiMic className="w-3.5 h-3.5" />
            {isListening ? 'Listening...' : 'Voice'}
          </button>
        </div>
        <textarea
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          className="input-field min-h-[120px] resize-y"
          placeholder="A brief professional summary highlighting your key achievements and career goals..."
          rows={4}
        />
        <p className="text-xs text-text-muted mt-1">{(data.summary || '').length}/500 characters</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
