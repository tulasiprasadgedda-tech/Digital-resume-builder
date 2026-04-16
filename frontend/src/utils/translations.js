// Multi-language support - JSON-based translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.templates': 'Templates',
    'nav.builder': 'Resume Builder',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',
    'nav.logout': 'Logout',
    
    // Landing
    'landing.title': 'Build Your Dream Resume',
    'landing.subtitle': 'Create stunning professional resumes in minutes with our AI-powered builder. Choose from 20+ free templates.',
    'landing.cta': 'Start Building Free',
    'landing.features': 'Features',
    
    // Auth
    'auth.login': 'Welcome Back',
    'auth.register': 'Create Account',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.loginBtn': 'Sign In',
    'auth.registerBtn': 'Create Account',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // Dashboard
    'dashboard.title': 'My Resumes',
    'dashboard.create': 'Create New Resume',
    'dashboard.empty': 'No resumes yet. Create your first one!',
    'dashboard.delete': 'Delete',
    'dashboard.edit': 'Edit',
    'dashboard.duplicate': 'Duplicate',
    
    // Builder
    'builder.personalInfo': 'Personal Information',
    'builder.education': 'Education',
    'builder.experience': 'Experience',
    'builder.skills': 'Skills',
    'builder.projects': 'Projects',
    'builder.certifications': 'Certifications',
    'builder.save': 'Save Resume',
    'builder.download': 'Download PDF',
    'builder.preview': 'Preview',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.loading': 'Loading...',
    'common.search': 'Search...'
  },
  hi: {
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.templates': 'टेम्पलेट्स',
    'nav.builder': 'रिज्यूमे बिल्डर',
    'nav.login': 'लॉगिन',
    'nav.register': 'साइन अप',
    'nav.logout': 'लॉगआउट',
    'landing.title': 'अपना सपनों का रिज्यूमे बनाएं',
    'landing.subtitle': 'हमारे AI-संचालित बिल्डर से मिनटों में शानदार प्रोफेशनल रिज्यूमे बनाएं। 20+ मुफ्त टेम्पलेट्स में से चुनें।',
    'landing.cta': 'मुफ्त में बनाना शुरू करें',
    'auth.login': 'वापसी पर स्वागत है',
    'auth.register': 'खाता बनाएं',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'dashboard.title': 'मेरे रिज्यूमे',
    'dashboard.create': 'नया रिज्यूमे बनाएं',
    'builder.personalInfo': 'व्यक्तिगत जानकारी',
    'builder.education': 'शिक्षा',
    'builder.experience': 'अनुभव',
    'builder.skills': 'कौशल',
    'builder.projects': 'प्रोजेक्ट्स',
    'builder.certifications': 'प्रमाणपत्र',
    'builder.save': 'रिज्यूमे सेव करें',
    'builder.download': 'पीडीएफ डाउनलोड',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.add': 'जोड़ें',
    'common.loading': 'लोड हो रहा है...'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.dashboard': 'Panel',
    'nav.templates': 'Plantillas',
    'nav.builder': 'Constructor de CV',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.logout': 'Cerrar Sesión',
    'landing.title': 'Crea Tu Currículum Soñado',
    'landing.subtitle': 'Crea currículos profesionales impresionantes en minutos con nuestro constructor potenciado por IA. Elige entre más de 20 plantillas gratuitas.',
    'landing.cta': 'Empieza Gratis',
    'auth.login': 'Bienvenido de Nuevo',
    'auth.register': 'Crear Cuenta',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre Completo',
    'dashboard.title': 'Mis Currículos',
    'dashboard.create': 'Crear Nuevo Currículo',
    'builder.personalInfo': 'Información Personal',
    'builder.education': 'Educación',
    'builder.experience': 'Experiencia',
    'builder.skills': 'Habilidades',
    'builder.projects': 'Proyectos',
    'builder.certifications': 'Certificaciones',
    'builder.save': 'Guardar Currículo',
    'builder.download': 'Descargar PDF',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.add': 'Agregar',
    'common.loading': 'Cargando...'
  }
};

export const getTranslation = (key, lang = 'en') => {
  return translations[lang]?.[key] || translations.en[key] || key;
};

export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default translations;
