import { formatDate, getFontSize, getSpacing } from './templateUtils';
const T = ({ data, theme }) => {
  const pi = data?.personalInfo || {};const color = theme?.primaryColor || '#1e293b';const font = theme?.fontFamily || 'Georgia';const fs = getFontSize(theme?.fontSize);const sp = getSpacing(theme?.spacing);
  const Section = ({ title, children }) => (<div style={{ marginBottom: sp.section }}><h2 style={{ fontSize: fs.section, fontWeight: 700, color: '#111', borderBottom: `3px solid ${color}`, paddingBottom: '6px', marginBottom: sp.item, textTransform: 'uppercase' }}>{title}</h2>{children}</div>);
  return (<div style={{ fontFamily: font, color: '#1f2937', padding: sp.padding, background: 'white', minHeight: '1056px' }}>
    <div style={{ borderBottom: `4px solid ${color}`, paddingBottom: '16px', marginBottom: sp.section }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>{pi.fullName || 'Your Name'}</h1>
      <div style={{ fontSize: fs.body, color: '#64748b', marginTop: '6px' }}>{[pi.email, pi.phone, pi.location, pi.linkedin].filter(Boolean).join(' | ')}</div>
    </div>
    {pi.summary && <Section title="Executive Summary"><p style={{ fontSize: fs.body, color: '#374151', lineHeight: 1.6 }}>{pi.summary}</p></Section>}
    {data?.experience?.length > 0 && <Section title="Professional Experience">{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: '16px' }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ fontSize: fs.title, textTransform: 'uppercase' }}>{exp.position}</strong><span style={{ fontSize: fs.body, color: '#64748b' }}>{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span></div><div style={{ fontSize: fs.body, fontWeight: 600, color: '#475569' }}>{exp.company}</div>{exp.bullets?.filter(b => b).length > 0 && <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>{exp.bullets.filter(b => b).map((b, bi) => (<li key={bi} style={{ fontSize: fs.body, color: '#374151', marginBottom: '2px' }}>{b}</li>))}</ul>}</div>))}</Section>}
    {data?.education?.length > 0 && <Section title="Education">{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: sp.item }}><strong style={{ fontSize: fs.title }}>{edu.degree} {edu.field && `in ${edu.field}`}</strong> – {edu.institution}<br/><span style={{ fontSize: fs.body, color: '#64748b' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}{edu.gpa && ` | GPA: ${edu.gpa}`}</span></div>))}</Section>}
    {data?.skills?.length > 0 && <Section title="Core Competencies"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>{data.skills.map((s, i) => (<div key={i} style={{ fontSize: fs.body, padding: '4px 0' }}>■ {s.name}</div>))}</div></Section>}
    {data?.projects?.length > 0 && <Section title="Key Projects">{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: sp.item }}><strong style={{ fontSize: fs.title }}>{p.name}</strong>{p.technologies && <span style={{ fontSize: fs.body, color: '#64748b' }}> ({p.technologies})</span>}{p.description && <p style={{ fontSize: fs.body, margin: '2px 0' }}>{p.description}</p>}</div>))}</Section>}
    {data?.certifications?.length > 0 && <Section title="Certifications">{data.certifications.map((c, i) => (<div key={i} style={{ fontSize: fs.body, marginBottom: '2px' }}>{c.name} — {c.issuer}{c.date && `, ${formatDate(c.date)}`}</div>))}</Section>}
  </div>);
};
export default T;
