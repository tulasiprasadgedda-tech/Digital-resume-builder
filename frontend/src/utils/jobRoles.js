// Job role database with predefined skills, keywords, and descriptions
const jobRoles = {
  'Software Developer': {
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'REST APIs', 'TypeScript', 'MongoDB', 'AWS'],
    keywords: ['agile', 'scrum', 'CI/CD', 'microservices', 'cloud computing', 'DevOps', 'unit testing', 'code review'],
    category: 'developer'
  },
  'Frontend Developer': {
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js', 'Redux', 'Figma', 'Responsive Design'],
    keywords: ['UI/UX', 'accessibility', 'performance optimization', 'cross-browser compatibility', 'component library', 'design system'],
    category: 'developer'
  },
  'Backend Developer': {
    skills: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs'],
    keywords: ['microservices', 'API design', 'database optimization', 'security', 'scalability', 'server architecture'],
    category: 'developer'
  },
  'Full Stack Developer': {
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Git', 'CI/CD'],
    keywords: ['full stack', 'MERN', 'MEAN', 'deployment', 'dev ops', 'system design', 'agile methodology'],
    category: 'developer'
  },
  'Mobile Developer': {
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'REST APIs', 'Redux', 'TypeScript', 'Git', 'CI/CD'],
    keywords: ['cross-platform', 'native development', 'app store', 'push notifications', 'mobile UI/UX'],
    category: 'developer'
  },
  'Data Scientist': {
    skills: ['Python', 'R', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Tableau', 'Statistics', 'Deep Learning', 'NLP'],
    keywords: ['predictive modeling', 'data mining', 'statistical analysis', 'big data', 'A/B testing', 'feature engineering'],
    category: 'analyst'
  },
  'Data Analyst': {
    skills: ['SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'R', 'Statistics', 'Data Visualization', 'ETL', 'Google Analytics'],
    keywords: ['data analysis', 'reporting', 'KPIs', 'dashboard', 'business intelligence', 'trend analysis'],
    category: 'analyst'
  },
  'UI/UX Designer': {
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research', 'Wireframing', 'HTML/CSS', 'Design Systems'],
    keywords: ['user experience', 'user interface', 'interaction design', 'usability testing', 'personas', 'journey mapping'],
    category: 'designer'
  },
  'Graphic Designer': {
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'After Effects', 'Typography', 'Branding', 'Print Design', 'Color Theory', 'Layout Design'],
    keywords: ['visual design', 'brand identity', 'creative direction', 'illustration', 'motion graphics'],
    category: 'designer'
  },
  'Product Designer': {
    skills: ['Figma', 'Sketch', 'Adobe CC', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS', 'Interaction Design', 'Usability Testing', 'Storyboarding'],
    keywords: ['product thinking', 'design sprint', 'user-centered design', 'cross-functional collaboration', 'design ops'],
    category: 'designer'
  },
  'Project Manager': {
    skills: ['Agile', 'Scrum', 'JIRA', 'Confluence', 'MS Project', 'Risk Management', 'Stakeholder Management', 'Budgeting', 'Leadership', 'Communication'],
    keywords: ['project lifecycle', 'resource allocation', 'deliverables', 'milestones', 'sprint planning', 'PMP'],
    category: 'manager'
  },
  'Product Manager': {
    skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Agile', 'JIRA', 'Roadmapping', 'A/B Testing', 'SQL', 'Figma', 'Stakeholder Management'],
    keywords: ['product roadmap', 'market analysis', 'user stories', 'KPIs', 'go-to-market', 'product-market fit'],
    category: 'manager'
  },
  'Marketing Manager': {
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Google Analytics', 'Social Media', 'Email Marketing', 'CRM', 'Copywriting', 'Brand Strategy', 'PPC'],
    keywords: ['campaign management', 'lead generation', 'conversion optimization', 'brand awareness', 'ROI'],
    category: 'manager'
  },
  'HR Manager': {
    skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Performance Management', 'Training & Development', 'Compliance', 'Compensation', 'Onboarding', 'Conflict Resolution', 'HR Analytics'],
    keywords: ['talent acquisition', 'workforce planning', 'employee engagement', 'benefits administration', 'organizational development'],
    category: 'manager'
  },
  'Business Analyst': {
    skills: ['SQL', 'Excel', 'Tableau', 'JIRA', 'Requirements Gathering', 'Process Mapping', 'Data Modeling', 'Agile', 'Power BI', 'Stakeholder Management'],
    keywords: ['business requirements', 'gap analysis', 'process improvement', 'documentation', 'system analysis'],
    category: 'analyst'
  },
  'DevOps Engineer': {
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Linux', 'Python', 'Ansible', 'Prometheus', 'Git'],
    keywords: ['infrastructure as code', 'CI/CD', 'monitoring', 'automation', 'cloud architecture', 'site reliability'],
    category: 'developer'
  },
  'QA Engineer': {
    skills: ['Selenium', 'Jest', 'Cypress', 'Python', 'Java', 'JIRA', 'API Testing', 'Performance Testing', 'Agile', 'Test Automation'],
    keywords: ['quality assurance', 'test planning', 'regression testing', 'bug tracking', 'test strategy'],
    category: 'developer'
  },
  'Teacher': {
    skills: ['Curriculum Development', 'Classroom Management', 'Differentiated Instruction', 'Assessment Design', 'Educational Technology', 'Student Engagement', 'Communication', 'Mentoring', 'Lesson Planning', 'Collaboration'],
    keywords: ['pedagogy', 'student outcomes', 'inclusive education', 'professional development', 'learning objectives'],
    category: 'general'
  },
  'Accountant': {
    skills: ['QuickBooks', 'SAP', 'Excel', 'Financial Reporting', 'Tax Preparation', 'Auditing', 'GAAP', 'Accounts Payable', 'Budgeting', 'Reconciliation'],
    keywords: ['financial analysis', 'compliance', 'bookkeeping', 'fiscal management', 'cost accounting'],
    category: 'analyst'
  },
  'Sales Executive': {
    skills: ['CRM', 'Salesforce', 'Negotiation', 'Lead Generation', 'Account Management', 'Presentation Skills', 'Pipeline Management', 'Cold Calling', 'Revenue Growth', 'Client Relations'],
    keywords: ['sales strategy', 'quota achievement', 'customer acquisition', 'business development', 'closing deals'],
    category: 'manager'
  },
  'Content Writer': {
    skills: ['SEO Writing', 'Copywriting', 'Content Strategy', 'WordPress', 'Social Media', 'Research', 'Editing', 'Grammar', 'Storytelling', 'CMS'],
    keywords: ['content marketing', 'editorial calendar', 'audience engagement', 'brand voice', 'content optimization'],
    category: 'designer'
  },
  'Cybersecurity Analyst': {
    skills: ['Network Security', 'SIEM', 'Penetration Testing', 'Firewall Management', 'Incident Response', 'Python', 'Linux', 'Risk Assessment', 'Compliance', 'Cryptography'],
    keywords: ['threat detection', 'vulnerability assessment', 'security audit', 'data protection', 'security operations'],
    category: 'analyst'
  },
  'Cloud Architect': {
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'Serverless', 'Networking', 'Security', 'Python'],
    keywords: ['cloud migration', 'infrastructure design', 'cost optimization', 'high availability', 'disaster recovery'],
    category: 'developer'
  },
  'Machine Learning Engineer': {
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'SQL', 'Docker'],
    keywords: ['model deployment', 'feature engineering', 'neural networks', 'data pipeline', 'model optimization'],
    category: 'developer'
  },
  'Mechanical Engineer': {
    skills: ['AutoCAD', 'SolidWorks', 'MATLAB', 'FEA', 'Manufacturing', '3D Modeling', 'Thermodynamics', 'GD&T', 'Project Management', 'Quality Control'],
    keywords: ['product design', 'prototyping', 'engineering analysis', 'lean manufacturing', 'technical documentation'],
    category: 'general'
  }
};

export const getRoleNames = () => Object.keys(jobRoles);

export const getRoleData = (roleName) => {
  return jobRoles[roleName] || {
    skills: ['Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Adaptability'],
    keywords: ['professional', 'dedicated', 'results-oriented'],
    category: 'general'
  };
};

export default jobRoles;
