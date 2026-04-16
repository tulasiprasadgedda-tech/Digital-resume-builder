// Smart Resume Generator - Generates professional content without AI APIs
// Uses predefined intelligent templates and string manipulation

const summaryTemplates = {
  developer: [
    "Results-driven {role} with expertise in {skills}. Proven track record of delivering scalable, high-performance applications and leading cross-functional teams to achieve project milestones ahead of schedule.",
    "Innovative {role} passionate about building elegant solutions using {skills}. Committed to writing clean, maintainable code and implementing best practices in software development.",
    "Detail-oriented {role} with strong proficiency in {skills}. Experienced in full software development lifecycle, from concept and design to testing and deployment."
  ],
  designer: [
    "Creative {role} with a keen eye for aesthetics and user experience using {skills}. Specializes in translating complex requirements into intuitive, visually compelling designs.",
    "Award-winning {role} skilled in {skills}. Passionate about creating meaningful digital experiences that drive engagement and deliver measurable business results.",
    "Versatile {role} combining artistic vision with technical expertise in {skills}. Experienced in leading design projects from concept to completion."
  ],
  manager: [
    "Strategic {role} with proven ability to lead teams and drive organizational growth. Expert in {skills} with a track record of exceeding targets and optimizing processes.",
    "Dynamic {role} with extensive experience in {skills}. Known for building high-performing teams and implementing data-driven strategies that deliver ROI.",
    "Results-oriented {role} skilled in {skills}. Adept at managing complex projects, stakeholder relationships, and cross-functional collaboration."
  ],
  analyst: [
    "Analytical {role} with deep expertise in {skills}. Experienced in transforming complex datasets into actionable insights that drive strategic decision-making.",
    "Detail-oriented {role} proficient in {skills}. Proven ability to identify trends, optimize processes, and deliver data-driven recommendations.",
    "Innovative {role} combining analytical acumen with expertise in {skills}. Passionate about leveraging data to solve complex business challenges."
  ],
  general: [
    "Dedicated professional with expertise in {skills}. Committed to delivering exceptional results and continuously improving processes to drive organizational success.",
    "Motivated {role} with a strong foundation in {skills}. Known for adaptability, attention to detail, and ability to thrive in fast-paced environments.",
    "Experienced {role} bringing comprehensive knowledge of {skills}. Passionate about contributing to team success and professional growth."
  ]
};

const bulletTemplates = {
  developer: [
    "Developed and maintained {item} resulting in {metric}% improvement in performance",
    "Architected scalable solutions using {tech} serving {metric}+ users",
    "Collaborated with cross-functional teams to deliver {item} ahead of schedule",
    "Implemented automated testing reducing bugs by {metric}% in production",
    "Optimized database queries improving response time by {metric}%",
    "Led code reviews and mentored junior developers on best practices",
    "Designed RESTful APIs handling {metric}+ requests per day",
    "Migrated legacy systems to modern tech stack using {tech}"
  ],
  designer: [
    "Designed {item} user interfaces increasing engagement by {metric}%",
    "Created comprehensive design systems used across {metric}+ products",
    "Conducted user research and usability testing with {metric}+ participants",
    "Developed responsive prototypes using {tech} reducing development time",
    "Improved conversion rates by {metric}% through A/B testing and design iteration",
    "Collaborated with product and engineering teams on {item} features",
    "Established brand guidelines adopted across the organization",
    "Led design sprints resulting in {metric}+ successful product launches"
  ],
  manager: [
    "Led team of {metric}+ professionals achieving {item} quarterly targets",
    "Increased department revenue by {metric}% through strategic initiatives",
    "Implemented {tech} processes improving team productivity by {metric}%",
    "Managed budgets exceeding ${metric}K while maintaining cost efficiency",
    "Developed training programs resulting in {metric}% employee retention",
    "Streamlined operations reducing overhead costs by {metric}%",
    "Built strategic partnerships generating {metric}+ new business opportunities",
    "Drove organizational change initiatives affecting {metric}+ stakeholders"
  ],
  general: [
    "Spearheaded {item} initiative resulting in {metric}% improvement",
    "Collaborated with stakeholders to deliver {item} projects on time",
    "Implemented {tech} solutions improving workflow efficiency by {metric}%",
    "Trained and mentored {metric}+ team members on best practices",
    "Analyzed data to identify opportunities saving {metric}+ hours annually",
    "Contributed to {item} projects achieving measurable business impact",
    "Developed documentation and processes adopted by the team",
    "Participated in cross-functional projects with {metric}+ departments"
  ]
};

const projectDescriptions = [
  "Built a full-stack {type} application using {tech}. Features include {feature1}, {feature2}, and {feature3}. Deployed on {platform} with CI/CD pipeline.",
  "Developed a {type} platform utilizing {tech} for {purpose}. Implemented {feature1} and {feature2} resulting in improved user experience.",
  "Created a {type} solution leveraging {tech} to address {purpose}. Key features include {feature1}, {feature2}, and real-time {feature3}."
];

// Get category based on role
const getCategory = (role) => {
  const roleLower = role.toLowerCase();
  if (roleLower.includes('develop') || roleLower.includes('engineer') || roleLower.includes('program') || roleLower.includes('coder') || roleLower.includes('fullstack') || roleLower.includes('frontend') || roleLower.includes('backend')) {
    return 'developer';
  }
  if (roleLower.includes('design') || roleLower.includes('ui') || roleLower.includes('ux') || roleLower.includes('graphic') || roleLower.includes('creative')) {
    return 'designer';
  }
  if (roleLower.includes('manag') || roleLower.includes('lead') || roleLower.includes('director') || roleLower.includes('head') || roleLower.includes('chief') || roleLower.includes('vp')) {
    return 'manager';
  }
  if (roleLower.includes('analyst') || roleLower.includes('data') || roleLower.includes('research') || roleLower.includes('scientist')) {
    return 'analyst';
  }
  return 'general';
};

// Generate professional summary
export const generateSummary = (name, role, skills) => {
  const category = getCategory(role);
  const templates = summaryTemplates[category] || summaryTemplates.general;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const skillsStr = skills.slice(0, 4).join(', ');
  return template.replace(/{role}/g, role).replace(/{skills}/g, skillsStr);
};

// Generate experience bullet points
export const generateBullets = (role, skills, count = 4) => {
  const category = getCategory(role);
  const templates = bulletTemplates[category] || bulletTemplates.general;
  const shuffled = [...templates].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return selected.map(template => {
    const metrics = [15, 20, 25, 30, 35, 40, 50, 60, 75, 100, 200, 500, 1000];
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const tech = skills[Math.floor(Math.random() * skills.length)] || 'modern technologies';
    const items = ['key product', 'critical feature', 'core platform', 'flagship product', 'enterprise solution'];
    const item = items[Math.floor(Math.random() * items.length)];
    
    return template
      .replace(/{metric}/g, metric)
      .replace(/{tech}/g, tech)
      .replace(/{item}/g, item);
  });
};

// Convert simple text to professional bullet point
export const smartBulletConvert = (text) => {
  if (!text || text.trim() === '') return text;
  
  const actionVerbs = ['Developed', 'Implemented', 'Designed', 'Led', 'Managed', 'Created', 'Built', 'Optimized', 'Streamlined', 'Executed', 'Delivered', 'Coordinated', 'Launched', 'Improved', 'Enhanced'];
  const resultPhrases = [
    'resulting in improved efficiency',
    'contributing to team objectives',
    'enhancing overall productivity',
    'driving measurable outcomes',
    'supporting organizational goals'
  ];
  
  const trimmed = text.trim();
  const startsWithVerb = actionVerbs.some(v => trimmed.toLowerCase().startsWith(v.toLowerCase()));
  
  if (startsWithVerb) {
    // Already has action verb, check if has result
    if (!trimmed.includes('result') && !trimmed.includes('improv') && !trimmed.includes('increas') && !trimmed.includes('reduc')) {
      const result = resultPhrases[Math.floor(Math.random() * resultPhrases.length)];
      return `${trimmed}, ${result}`;
    }
    return trimmed;
  }
  
  // Add action verb
  const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
  const result = resultPhrases[Math.floor(Math.random() * resultPhrases.length)];
  return `${verb} ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}, ${result}`;
};

// Generate project description
export const generateProjectDescription = (projectName, technologies) => {
  const types = ['web', 'mobile', 'full-stack', 'cloud-based', 'enterprise'];
  const purposes = ['streamlining workflows', 'enhancing user engagement', 'automating processes', 'data visualization', 'team collaboration'];
  const features = ['user authentication', 'real-time updates', 'responsive design', 'data analytics', 'API integration', 'search functionality', 'notification system', 'role-based access'];
  const platforms = ['AWS', 'Vercel', 'Heroku', 'Firebase', 'DigitalOcean'];
  
  const template = projectDescriptions[Math.floor(Math.random() * projectDescriptions.length)];
  const shuffledFeatures = [...features].sort(() => Math.random() - 0.5);
  
  return template
    .replace('{type}', types[Math.floor(Math.random() * types.length)])
    .replace('{tech}', technologies || 'modern tech stack')
    .replace('{purpose}', purposes[Math.floor(Math.random() * purposes.length)])
    .replace('{feature1}', shuffledFeatures[0])
    .replace('{feature2}', shuffledFeatures[1])
    .replace('{feature3}', shuffledFeatures[2])
    .replace('{platform}', platforms[Math.floor(Math.random() * platforms.length)]);
};

export default {
  generateSummary,
  generateBullets,
  smartBulletConvert,
  generateProjectDescription,
  getCategory
};
