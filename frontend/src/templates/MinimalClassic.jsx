import { formatDate, getFontSize, getSpacing } from './templateUtils';

const MinimalClassic = ({ data, theme }) => {
  const pi = data?.personalInfo || {};
  const fs = getFontSize(theme?.fontSize);
  const sp = getSpacing(theme?.spacing);
  const color = theme?.primaryColor || '#2563eb';
  const font = theme?.fontFamily || 'Inter';

  return (
    <div style={{ fontFamily: font, color: '#1f2937', lineHeight: 1.5, padding: sp.padding, background: 'white', minHeight: '1056px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: sp.section }}>
        <h1 style={{ fontSize: fs.name, fontWeight: 700, color: '#111827', margin: 0 }}>{pi.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: fs.body, color: '#6b7280', marginTop: '6px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>• {pi.phone}</span>}
          {pi.location && <span>• {pi.location}</span>}
          {pi.linkedin && <span>• {pi.linkedin}</span>}
          {pi.website && <span>• {pi.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {pi.summary && (
        <div style={{ marginBottom: sp.section }}>
          <h2 style={{ fontSize: fs.section, fontWeight: 700, color, borderBottom: `2px solid ${color}`, paddingBottom: '4px', marginBottom: sp.item }}>PROFESSIONAL SUMMARY</h2>
          <p style={{ fontSize: fs.body, color: '#374151' }}>{pi.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: sp.section }}>
          <h2 style={{ fontSize: fs.section, fontWeight: 700, color, borderBottom: `2px solid ${color}`, paddingBottom: '4px', marginBottom: sp.item }}>EXPERIENCE</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: sp.item }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: fs.title }}>{exp.position}</strong>
                <span style={{ fontSize: fs.body, color: '#6b7280' }}>{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <div style={{ fontSize: fs.body, color, fontStyle: 'italic' }}>{exp.company}</div>
              {exp.bullets?.length > 0 && (
                <ul style={{ margin: '4px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                  {exp.bullets.filter(b => b).map((bullet, bi) => (
                    <li key={bi} style={{ fontSize: fs.body, marginBottom: '2px', color: '#374151' }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data?.education?.length > 0 && (
        <div style={{ marginBottom: sp.section }}>
          <h2 style={{ fontSize: fs.section, fontWeight: 700, color, borderBottom: `2px solid ${color}`, paddingBottom: '4px', marginBottom: sp.item }}>EDUCATION</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: sp.item }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: fs.title }}>{edu.degree} {edu.field && `in ${edu.field}`}</strong>
                <span style={{ fontSize: fs.body, color: '#6b7280' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
              </div>
              <div style={{ fontSize: fs.body, color }}>{edu.institution}</div>
              {edu.gpa && <div style={{ fontSize: fs.body, color: '#6b7280' }}>GPA: {edu.gpa}</div>}
              {edu.description && <p style={{ fontSize: fs.body, color: '#374151', marginTop: '2px' }}>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data?.skills?.length > 0 && (
        <div style={{ marginBottom: sp.section }}>
          <h2 style={{ fontSize: fs.section, fontWeight: 700, color, borderBottom: `2px solid ${color}`, paddingBottom: '4px', marginBottom: sp.item }}>SKILLS</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{ fontSize: fs.body, background: `${color}10`, color, padding: '2px 10px', borderRadius: '4px', border: `1px solid ${color}30` }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: sp.section }}>
          <h2 style={{ fontSize: fs.section, fontWeight: 700, color, borderBottom: `2px solid ${color}`, paddingBottom: '4px', marginBottom: sp.item }}>PROJECTS</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: sp.item }}>
              <strong style={{ fontSize: fs.title }}>{proj.name}</strong>
              {proj.technologies && <span style={{ fontSize: fs.body, color: '#6b7280' }}> | {proj.technologies}</span>}
              {proj.description && <p style={{ fontSize: fs.body, color: '#374151', margin: '2px 0 0' }}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data?.certifications?.length > 0 && (
        <div>
          <h2 style={{ fontSize: fs.section, fontWeight: 700, color, borderBottom: `2px solid ${color}`, paddingBottom: '4px', marginBottom: sp.item }}>CERTIFICATIONS</h2>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '4px', fontSize: fs.body }}>
              <strong>{cert.name}</strong> – {cert.issuer} {cert.date && `(${formatDate(cert.date)})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalClassic;
