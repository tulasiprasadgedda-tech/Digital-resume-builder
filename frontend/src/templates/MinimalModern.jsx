import { formatDate, getFontSize, getSpacing } from './templateUtils';
const MinimalModern = ({ data, theme }) => {
  const pi = data?.personalInfo || {};
  const fs = getFontSize(theme?.fontSize);
  const sp = getSpacing(theme?.spacing);
  const color = theme?.primaryColor || '#8b5cf6';
  const font = theme?.fontFamily || 'Outfit';
  return (
    <div style={{ fontFamily: font, color: '#1f2937', padding: sp.padding, background: 'white', minHeight: '1056px' }}>
      <div style={{ marginBottom: sp.section }}>
        <h1 style={{ fontSize: fs.name, fontWeight: 800, color: '#111', margin: 0, letterSpacing: '-0.5px' }}>{pi.fullName || 'Your Name'}</h1>
        <div style={{ width: '60px', height: '4px', background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: '2px', margin: '8px 0' }} />
        <div style={{ fontSize: fs.body, color: '#6b7280', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.linkedin && <span>{pi.linkedin}</span>}
        </div>
      </div>
      {pi.summary && <div style={{ marginBottom: sp.section, padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: `3px solid ${color}` }}><p style={{ fontSize: fs.body, color: '#374151', margin: 0, lineHeight: 1.6 }}>{pi.summary}</p></div>}
      {data?.experience?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: fs.section, fontWeight: 700, color, marginBottom: sp.item, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '11px' }}>Experience</h2>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: '16px', paddingLeft: '16px', borderLeft: `2px solid ${color}20` }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fs.title, color: '#111' }}>{exp.position}</strong><span style={{ fontSize: fs.body, color: '#9ca3af' }}>{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span></div><div style={{ fontSize: fs.body, color }}>{exp.company}</div>{exp.bullets?.filter(b => b).map((b, bi) => (<p key={bi} style={{ fontSize: fs.body, color: '#4b5563', margin: '3px 0', paddingLeft: '12px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color }}>›</span> {b}</p>))}</div>))}</div>}
      {data?.education?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: '11px', fontWeight: 700, color, marginBottom: sp.item, textTransform: 'uppercase', letterSpacing: '2px' }}>Education</h2>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: sp.item }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fs.title }}>{edu.degree} {edu.field && `in ${edu.field}`}</strong><span style={{ fontSize: fs.body, color: '#9ca3af' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span></div><div style={{ fontSize: fs.body, color }}>{edu.institution}{edu.gpa && ` • GPA: ${edu.gpa}`}</div></div>))}</div>}
      {data?.skills?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: '11px', fontWeight: 700, color, marginBottom: sp.item, textTransform: 'uppercase', letterSpacing: '2px' }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{data.skills.map((s, i) => (<span key={i} style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '20px', background: `${color}12`, color, fontWeight: 500 }}>{s.name}</span>))}</div></div>}
      {data?.projects?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: '11px', fontWeight: 700, color, marginBottom: sp.item, textTransform: 'uppercase', letterSpacing: '2px' }}>Projects</h2>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: sp.item }}><strong style={{ fontSize: fs.title }}>{p.name}</strong>{p.technologies && <span style={{ fontSize: fs.body, color: '#9ca3af' }}> • {p.technologies}</span>}{p.description && <p style={{ fontSize: fs.body, color: '#4b5563', margin: '2px 0' }}>{p.description}</p>}</div>))}</div>}
      {data?.certifications?.length > 0 && <div><h2 style={{ fontSize: '11px', fontWeight: 700, color, marginBottom: sp.item, textTransform: 'uppercase', letterSpacing: '2px' }}>Certifications</h2>{data.certifications.map((c, i) => (<div key={i} style={{ fontSize: fs.body, marginBottom: '3px' }}><strong>{c.name}</strong> – {c.issuer} {c.date && `(${formatDate(c.date)})`}</div>))}</div>}
    </div>
  );
};
export default MinimalModern;
