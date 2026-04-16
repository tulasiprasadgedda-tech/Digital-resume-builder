// Demo data for Quick Fill feature
export const demoData = {
  title: 'Full Stack Developer Resume',
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Innovative Full Stack Developer with 4+ years of experience building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code, user experience, and delivering high-impact solutions. Led cross-functional teams to ship products used by 500K+ users.'
  },
  education: [
    {
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2017-08',
      endDate: '2021-05',
      gpa: '3.8',
      description: 'Dean\'s List, ACM Programming Club President, Teaching Assistant for Data Structures'
    }
  ],
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: 'Leading development of the company\'s flagship SaaS platform',
      bullets: [
        'Architected a microservices-based platform serving 200K+ daily active users with 99.9% uptime',
        'Led a team of 5 developers, implementing agile methodologies that improved sprint velocity by 35%',
        'Optimized database queries reducing API response time by 60%, enhancing user experience',
        'Implemented CI/CD pipelines using GitHub Actions, reducing deployment time from 2 hours to 15 minutes'
      ]
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2021-06',
      endDate: '2022-12',
      current: false,
      description: 'Developed core features for an e-commerce platform',
      bullets: [
        'Built responsive React components with TypeScript, improving code quality and reducing bugs by 40%',
        'Developed RESTful APIs using Node.js and Express, handling 50K+ requests per day',
        'Integrated Stripe payment processing, contributing to $2M+ in annual transaction volume',
        'Collaborated with UX team to redesign the checkout flow, increasing conversion by 25%'
      ]
    }
  ],
  skills: [
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Python', level: 'Advanced' },
    { name: 'MongoDB', level: 'Advanced' },
    { name: 'PostgreSQL', level: 'Advanced' },
    { name: 'AWS', level: 'Intermediate' },
    { name: 'Docker', level: 'Intermediate' },
    { name: 'GraphQL', level: 'Intermediate' },
    { name: 'Git', level: 'Expert' }
  ],
  projects: [
    {
      name: 'TaskFlow Pro',
      description: 'A real-time project management tool with Kanban boards, team collaboration, and analytics dashboard. Built with React, Node.js, Socket.io, and MongoDB. Features include drag-and-drop, real-time notifications, and role-based access control.',
      technologies: 'React, Node.js, Socket.io, MongoDB, Redis',
      link: 'github.com/alexjohnson/taskflow-pro'
    },
    {
      name: 'AI Content Generator',
      description: 'A SaaS platform that generates marketing content using machine learning models. Includes user authentication, subscription management, and content analytics. Serves 10K+ registered users.',
      technologies: 'Next.js, Python, FastAPI, PostgreSQL, OpenAI API',
      link: 'github.com/alexjohnson/ai-content-gen'
    },
    {
      name: 'E-Commerce Dashboard',
      description: 'An analytics dashboard for e-commerce businesses featuring real-time sales tracking, inventory management, and automated reporting. Processes 100K+ data points daily.',
      technologies: 'React, D3.js, Express, PostgreSQL, AWS',
      link: 'github.com/alexjohnson/ecom-dashboard'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-06',
      link: 'aws.amazon.com/certification'
    },
    {
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta (Coursera)',
      date: '2022-09',
      link: 'coursera.org/certificate/meta-frontend'
    },
    {
      name: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      date: '2022-03',
      link: 'university.mongodb.com'
    }
  ]
};

// Different demo profiles for variety
export const demoProfiles = {
  developer: demoData,
  designer: {
    title: 'UI/UX Designer Resume',
    personalInfo: {
      fullName: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/sarahchen',
      website: 'sarahchen.design',
      summary: 'Award-winning UI/UX Designer with 5+ years crafting intuitive digital experiences for Fortune 500 companies. Expert in user research, interaction design, and design systems. Passionate about accessible, inclusive design that drives business results.'
    },
    education: [
      {
        institution: 'Parsons School of Design',
        degree: 'Master of Fine Arts',
        field: 'Design & Technology',
        startDate: '2016-09',
        endDate: '2018-05',
        gpa: '3.9',
        description: 'Thesis: "Designing Empathy: Human-Centered Approaches to Digital Accessibility"'
      }
    ],
    experience: [
      {
        company: 'Design Studio Pro',
        position: 'Senior UI/UX Designer',
        startDate: '2022-03',
        endDate: '',
        current: true,
        description: 'Lead designer for enterprise SaaS products',
        bullets: [
          'Redesigned the core product dashboard, increasing user engagement by 45% and reducing support tickets by 30%',
          'Created a comprehensive design system with 200+ components, adopted by 4 product teams',
          'Conducted 50+ user interviews and usability tests, translating insights into actionable design improvements',
          'Mentored 3 junior designers and established design review processes for the team'
        ]
      }
    ],
    skills: [
      { name: 'Figma', level: 'Expert' },
      { name: 'Adobe XD', level: 'Expert' },
      { name: 'Sketch', level: 'Advanced' },
      { name: 'Prototyping', level: 'Expert' },
      { name: 'User Research', level: 'Advanced' },
      { name: 'Design Systems', level: 'Expert' },
      { name: 'HTML/CSS', level: 'Advanced' },
      { name: 'Interaction Design', level: 'Expert' },
      { name: 'Usability Testing', level: 'Advanced' },
      { name: 'Information Architecture', level: 'Advanced' }
    ],
    projects: [
      {
        name: 'HealthApp Redesign',
        description: 'Complete redesign of a healthcare mobile app serving 1M+ patients. Improved accessibility scores from 60% to 98% and reduced task completion time by 40%.',
        technologies: 'Figma, Principle, Maze, Hotjar',
        link: 'behance.net/sarahchen/healthapp'
      }
    ],
    certifications: [
      {
        name: 'Google UX Design Professional Certificate',
        issuer: 'Google (Coursera)',
        date: '2022-05',
        link: 'coursera.org/certificate/google-ux'
      }
    ]
  }
};

export default demoData;
