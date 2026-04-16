import { formatDate, getFontSize, getSpacing } from './templateUtils';
const MinimalElegant = ({ data, theme }) => {
  const pi = data?.personalInfo || {};
  const color = theme?.primaryColor || '#ec4899';
  const font = theme?.fontFamily || 'Playfair Display';
  const fs = getFontSize(theme?.fontSize);
  const sp = getSpacing(theme?.spacing);
  return (
    <div style={{ fontFamily: font, color: '#1f2937', padding: sp.padding, background: 'white', minHeight: '1056px' }}>
      <div style={{ textAlign: 'center', marginBottom: sp.section, paddingBottom: sp.section, borderBottom: `1px solid #e5e7eb` }}>
        <h1 style={{ fontSize: fs.name, fontWeight: 600, color: '#111', margin: 0, letterSpacing: '3px', textTransform: 'uppercase' }}>{pi.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: fs.body, color: '#9ca3af', marginTop: '8px', fontFamily: 'Inter', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {pi.email && <span>{pi.email}</span>}{pi.phone && <span>{pi.phone}</span>}{pi.location && <span>{pi.location}</span>}{pi.linkedin && <span>{pi.linkedin}</span>}
        </div>
      </div>
      {pi.summary && <div style={{ marginBottom: sp.section, textAlign: 'center', fontStyle: 'italic', maxWidth: '500px', margin: '0 auto', marginBottom: sp.section }}><p style={{ fontSize: fs.body, color: '#4b5563', lineHeight: 1.7 }}>{pi.summary}</p></div>}
      {data?.experience?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: fs.section, fontWeight: 600, textAlign: 'center', color: '#111', marginBottom: sp.item, letterSpacing: '2px', textTransform: 'uppercase' }}>Experience</h2><div style={{ width: '30px', height: '2px', background: color, margin: '0 auto 16px' }} />{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: '14px' }}><div style={{ textAlign: 'center' }}><strong style={{ fontSize: fs.title, color: '#111' }}>{exp.position}</strong><div style={{ fontSize: fs.body, color }}>{exp.company} | {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</div></div>{exp.bullets?.filter(b => b).length > 0 && <ul style={{ margin: '6px auto', maxWidth: '450px', listStyle: 'none', padding: 0 }}>{exp.bullets.filter(b => b).map((b, bi) => (<li key={bi} style={{ fontSize: fs.body, color: '#4b5563', marginBottom: '3px', textAlign: 'center' }}>— {b}</li>))}</ul>}</div>))}</div>}
      {data?.education?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: fs.section, fontWeight: 600, textAlign: 'center', color: '#111', marginBottom: sp.item, letterSpacing: '2px', textTransform: 'uppercase' }}>Education</h2><div style={{ width: '30px', height: '2px', background: color, margin: '0 auto 16px' }} />{data.education.map((edu, i) => (<div key={i} style={{ textAlign: 'center', marginBottom: sp.item }}><strong style={{ fontSize: fs.title }}>{edu.degree} {edu.field && `in ${edu.field}`}</strong><div style={{ fontSize: fs.body, color }}>{edu.institution}</div>{edu.gpa && <div style={{ fontSize: fs.body, color: '#9ca3af' }}>GPA: {edu.gpa}</div>}</div>))}</div>}
      {data?.skills?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: fs.section, fontWeight: 600, textAlign: 'center', color: '#111', marginBottom: sp.item, letterSpacing: '2px', textTransform: 'uppercase' }}>Skills</h2><div style={{ width: '30px', height: '2px', background: color, margin: '0 auto 16px' }} /><p style={{ textAlign: 'center', fontSize: fs.body, color: '#4b5563' }}>{data.skills.map(s => s.name).join(' • ')}</p></div>}
      {data?.projects?.length > 0 && <div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: fs.section, fontWeight: 600, textAlign: 'center', color: '#111', marginBottom: sp.item, letterSpacing: '2px', textTransform: 'uppercase' }}>Projects</h2><div style={{ width: '30px', height: '2px', background: color, margin: '0 auto 16px' }} />{data.projects.map((p, i) => (<div key={i} style={{ textAlign: 'center', marginBottom: sp.item }}><strong style={{ fontSize: fs.title }}>{p.name}</strong>{p.technologies && <div style={{ fontSize: fs.body, color: '#9ca3af' }}>{p.technologies}</div>}{p.description && <p style={{ fontSize: fs.body, color: '#4b5563', margin: '2px 0' }}>{p.description}</p>}</div>))}</div>}
      {data?.certifications?.length > 0 && <div><h2 style={{ fontSize: fs.section, fontWeight: 600, textAlign: 'center', color: '#111', marginBottom: sp.item, letterSpacing: '2px', textTransform: 'uppercase' }}>Certifications</h2><div style={{ width: '30px', height: '2px', background: color, margin: '0 auto 16px' }} />{data.certifications.map((c, i) => (<div key={i} style={{ textAlign: 'center', fontSize: fs.body, marginBottom: '3px' }}><strong>{c.name}</strong> — {c.issuer}</div>))}</div>}
    </div>
  );
};
export default MinimalElegant;
