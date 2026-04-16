// ATS (Applicant Tracking System) keyword database
const atsKeywords = {
  technical: [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue', 'Node.js',
    'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Git', 'CI/CD', 'REST API', 'GraphQL', 'TypeScript', 'HTML', 'CSS', 'Agile',
    'Scrum', 'DevOps', 'Machine Learning', 'AI', 'Data Science', 'Cloud Computing',
    'Microservices', 'Linux', 'TensorFlow', 'PyTorch', 'Terraform', 'Jenkins',
    'Redis', 'Elasticsearch', 'Figma', 'Adobe', 'Excel', 'Tableau', 'Power BI'
  ],
  soft: [
    'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
    'Critical Thinking', 'Time Management', 'Adaptability', 'Creativity',
    'Decision Making', 'Conflict Resolution', 'Negotiation', 'Mentoring',
    'Strategic Planning', 'Project Management', 'Stakeholder Management',
    'Analytical Skills', 'Attention to Detail', 'Initiative', 'Innovation'
  ],
  action: [
    'Achieved', 'Implemented', 'Developed', 'Led', 'Managed', 'Designed',
    'Created', 'Built', 'Optimized', 'Streamlined', 'Increased', 'Reduced',
    'Delivered', 'Launched', 'Coordinated', 'Established', 'Improved', 'Executed',
    'Collaborated', 'Analyzed', 'Automated', 'Mentored', 'Spearheaded', 'Pioneered',
    'Transformed', 'Engineered', 'Architected', 'Integrated', 'Migrated', 'Scaled'
  ],
  metrics: [
    'revenue', 'growth', 'efficiency', 'productivity', 'performance',
    'reduction', 'improvement', 'increase', 'decrease', 'ROI',
    'conversion', 'retention', 'satisfaction', 'utilization'
  ]
};

// Check if a word is an ATS keyword
export const isATSKeyword = (word) => {
  const allKeywords = [
    ...atsKeywords.technical,
    ...atsKeywords.soft,
    ...atsKeywords.action,
    ...atsKeywords.metrics
  ];
  return allKeywords.some(kw => kw.toLowerCase() === word.toLowerCase());
};

// Find ATS keywords in text
export const findATSKeywords = (text) => {
  if (!text) return [];
  const allKeywords = [
    ...atsKeywords.technical,
    ...atsKeywords.soft,
    ...atsKeywords.action
  ];
  
  const found = [];
  allKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (regex.test(text)) {
      found.push(keyword);
    }
  });
  return [...new Set(found)];
};

// Get keyword density score
export const getKeywordScore = (resumeData) => {
  const text = JSON.stringify(resumeData).toLowerCase();
  let found = 0;
  let total = 0;
  
  [...atsKeywords.technical, ...atsKeywords.soft].forEach(kw => {
    total++;
    if (text.includes(kw.toLowerCase())) found++;
  });
  
  return Math.round((found / Math.min(total, 20)) * 100);
};

export default atsKeywords;
