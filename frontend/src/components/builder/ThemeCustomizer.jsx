import { templateList } from '../../templates';

const ThemeCustomizer = ({ settings, templateId, onChange, onTemplateChange }) => {
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
    '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
    '#1e293b', '#0f172a', '#7c3aed', '#db2777', '#059669'
  ];

  const fonts = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Outfit', value: 'Outfit' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Poppins', value: 'Poppins' },
    { label: 'Playfair Display', value: 'Playfair Display' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Arial', value: 'Arial' }
  ];

  const fontSizes = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];

  const spacings = [
    { label: 'Compact', value: 'compact' },
    { label: 'Normal', value: 'normal' },
    { label: 'Relaxed', value: 'relaxed' }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Theme Customizer</h2>
      <p className="text-sm text-text-muted mb-6">Customize your resume's appearance</p>

      {/* Template selector */}
      <div className="mb-8">
        <label className="input-label text-sm mb-3">Template</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {templateList.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => onTemplateChange(tmpl.id)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                templateId === tmpl.id
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-border dark:border-border-dark hover:border-primary/30'
              }`}
            >
              <div className={`w-full h-16 rounded-lg mb-2 flex items-center justify-center text-2xl`}
                style={{ background: `linear-gradient(135deg, ${tmpl.preview}20, ${tmpl.preview}40)` }}>
                {tmpl.icon}
              </div>
              <p className="text-xs font-medium text-text dark:text-text-dark truncate">{tmpl.name}</p>
              <p className="text-xs text-text-muted">{tmpl.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div className="mb-6">
        <label className="input-label text-sm mb-3">Primary Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => onChange({ ...settings, primaryColor: color })}
              className={`w-8 h-8 rounded-full transition-all ${
                settings.primaryColor === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={settings.primaryColor || '#6366f1'}
            onChange={(e) => onChange({ ...settings, primaryColor: e.target.value })}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>

      {/* Font Family */}
      <div className="mb-6">
        <label className="input-label text-sm mb-2">Font Family</label>
        <select
          value={settings.fontFamily || 'Inter'}
          onChange={(e) => onChange({ ...settings, fontFamily: e.target.value })}
          className="input-field"
        >
          {fonts.map(font => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <label className="input-label text-sm mb-2">Font Size</label>
        <div className="flex gap-2">
          {fontSizes.map(size => (
            <button
              key={size.value}
              onClick={() => onChange({ ...settings, fontSize: size.value })}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                settings.fontSize === size.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div className="mb-6">
        <label className="input-label text-sm mb-2">Spacing</label>
        <div className="flex gap-2">
          {spacings.map(spacing => (
            <button
              key={spacing.value}
              onClick={() => onChange({ ...settings, spacing: spacing.value })}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                settings.spacing === spacing.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200'
              }`}
            >
              {spacing.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
